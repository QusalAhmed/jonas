import { GoogleGenAI } from "@google/genai";

interface GenerateProps {
    contents: string;
}

const Gemini = async ({ contents }: GenerateProps) => {
    const ai = new GoogleGenAI({});
    const response = await ai.models.generateContent({
        model: "gemini-2.5-pro",
        contents,
    });

    // Assuming response.text
    return (
        <div>
            <p>{response.text || ""}</p>
        </div>
    );
};

export default Gemini;