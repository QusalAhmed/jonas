// LazopClient.ts
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import crypto from "crypto";
import os from "os";
import path from "path";
import fs from "fs";
import { platform } from "process";

// ================== Types ==================

// Lazada system parameter keys
type LazadaSysParamKey =
    | "app_key"
    | "access_token"
    | "timestamp"
    | "sign"
    | "sign_method"
    | "partner_id"
    | "debug";

// Lazada API response format
export interface LazopApiResponse<T = unknown> {
    code?: string;
    type?: string;
    message?: string;
    request_id?: string;

    [key: string]: unknown; // for dynamic extra fields
}

// Lazop API parameters
export type LazadaParams = Record<string, string | number | boolean>;

// Lazop file parameters (can be Blob, Buffer, File, etc.)
export type LazadaFileParams = Record<string, Blob | Buffer | File | string>;

// Constants
const P_SDK_VERSION = "lazop-sdk-typescript-2025";
const P_APPKEY: LazadaSysParamKey = "app_key";
const P_ACCESS_TOKEN: LazadaSysParamKey = "access_token";
const P_TIMESTAMP: LazadaSysParamKey = "timestamp";
const P_SIGN: LazadaSysParamKey = "sign";
const P_SIGN_METHOD: LazadaSysParamKey = "sign_method";
const P_PARTNER_ID: LazadaSysParamKey = "partner_id";
const P_DEBUG: LazadaSysParamKey = "debug";

const P_CODE = "code";
const P_TYPE = "type";
const P_MESSAGE = "message";
const P_REQUEST_ID = "request_id";

export const P_LOG_LEVEL_DEBUG = "DEBUG";
export const P_LOG_LEVEL_INFO = "INFO";
export const P_LOG_LEVEL_ERROR = "ERROR";

// Create logs folder
const homeDir = os.homedir();
const logDir = path.join(homeDir, "logs");
if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir);
}
const logFile = path.join(logDir, `lazopsdk.log.${new Date().toISOString().split("T")[0]}`);

// Simple logger
function logApiError(appkey: string, sdkVersion: string, requestUrl: string, code: string, message: string) {
    const localIp =
        Object.values(os.networkInterfaces())
            .flat()
            .find((iface) => iface && iface.family === "IPv4" && !iface.internal)?.address || "0.0.0.0";
    const platformType = platform;
    const logMessage = `${appkey}^_^${sdkVersion}^_^${new Date().toISOString()}^_^${localIp}^_^${platformType}^_^${requestUrl}^_^${code}^_^${message}\n`;
    fs.appendFileSync(logFile, logMessage);
}

// Sign function
function sign(secret: string, api: string, parameters: LazadaParams): string {
    const sortedKeys = Object.keys(parameters).sort();
    const parametersStr = api + sortedKeys.map((key) => `${key}${parameters[key]}`).join("");
    return crypto.createHmac("sha256", secret).update(parametersStr, "utf8").digest("hex").toUpperCase();
}

// LazopRequest class
export class LazopRequest {
    private apiParams: LazadaParams = {};
    private fileParams: LazadaFileParams = {};

    constructor(public apiName: string, public httpMethod: "GET" | "POST" = "POST") {
    }

    addApiParam(key: string, value: string | number | boolean) {
        this.apiParams[key] = value;
    }

    addFileParam(key: string, value: Blob | Buffer | File | string) {
        this.fileParams[key] = value;
    }

    getApiParams(): LazadaParams {
        return this.apiParams;
    }

    getFileParams(): LazadaFileParams {
        return this.fileParams;
    }
}

// LazopResponse class
export class LazopResponse<T = unknown> {
    type?: string;
    code?: string;
    message?: string;
    request_id?: string;
    body?: LazopApiResponse<T>;

    toString(): string {
        return `type=${this.type || ""} code=${this.code || ""} message=${this.message || ""} requestId=${
            this.request_id || ""
        }`;
    }
}

// LazopClient class
export class LazopClient {
    public logLevel: string = P_LOG_LEVEL_ERROR;

    constructor(
        private serverUrl: string,
        private appKey: string,
        private appSecret: string,
        private timeout: number = 30000
    ) {
    }

    async execute<T = unknown>(request: LazopRequest, accessToken?: string): Promise<LazopResponse<T>> {
        const sysParameters: LazadaParams = {
            [P_APPKEY]: this.appKey,
            [P_SIGN_METHOD]: "sha256",
            [P_TIMESTAMP]: `${Math.floor(Date.now() / 1000)}000`,
            [P_PARTNER_ID]: P_SDK_VERSION,
        };

        if (this.logLevel === P_LOG_LEVEL_DEBUG) {
            sysParameters[P_DEBUG] = "true";
        }

        if (accessToken) {
            sysParameters[P_ACCESS_TOKEN] = accessToken;
        }

        const applicationParameter = request.getApiParams();
        const signParameter: LazadaParams = {...sysParameters, ...applicationParameter};

        signParameter[P_SIGN] = sign(this.appSecret, request.apiName, signParameter);

        const apiUrl = `${this.serverUrl}${request.apiName}`;
        const fullUrl = apiUrl + "?" + new URLSearchParams(signParameter as Record<string, string>).toString();

        try {
            let res: AxiosResponse<LazopApiResponse<T>>;
            const config: AxiosRequestConfig = {timeout: this.timeout};

            if (request.httpMethod === "POST" || Object.keys(request.getFileParams()).length > 0) {
                res = await axios.post(apiUrl, signParameter, config);
            } else {
                res = await axios.get(apiUrl, {...config, params: signParameter});
            }

            const response = new LazopResponse<T>();
            const jsonObj = res.data;

            if (P_CODE in jsonObj) response.code = jsonObj[P_CODE] as string;
            if (P_TYPE in jsonObj) response.type = jsonObj[P_TYPE] as string;
            if (P_MESSAGE in jsonObj) response.message = jsonObj[P_MESSAGE] as string;
            if (P_REQUEST_ID in jsonObj) response.request_id = jsonObj[P_REQUEST_ID] as string;

            if (response.code && response.code !== "0") {
                logApiError(this.appKey, P_SDK_VERSION, fullUrl, response.code, response.message || "");
            } else if ([P_LOG_LEVEL_DEBUG, P_LOG_LEVEL_INFO].includes(this.logLevel)) {
                logApiError(this.appKey, P_SDK_VERSION, fullUrl, "", "");
            }

            response.body = jsonObj;
            return response;
        } catch (err: unknown) {
            const message = err instanceof Error ? err.message : String(err);
            logApiError(this.appKey, P_SDK_VERSION, fullUrl, "HTTP_ERROR", message);
            throw err;
        }
    }
}
