import { LazopClient, LazopRequest, LazopResponse } from './lazop';

async function testLazadaApi(): Promise<void> {
    // params 1: gateway url
    const appKey = '502674'
    const appSecret = 'L9G3GPp1sSjskWErrP8gldKQmEyp9xU9'
    const accessToken = '50000200637py3qMFx8LosYQp9fbk2cpScvwg9gjq4sTufjdB1cc8d1f0Zclhv'
    const client = new LazopClient('https://api.daraz.com.bd/rest', appKey, appSecret);

    // create an api request set GET method
    // default http method is POST
    const request = new LazopRequest('/seller/metrics/get', 'GET');
    // request.addApiParam('start_time', Date.now().toString());
    // request.addApiParam('page_size', '20');

    try {
        const response: LazopResponse = await client.execute(request, accessToken);

        console.log('Response type:', response.type);

        // response code, 0 is no error
        console.log('Response code:', response.code);

        // response error message
        console.log('Response message:', response.message);

        // full response
        console.log('Full response body:', JSON.stringify(response.body, null, 2));

    } catch (error) {
        console.error('Error executing API request:', error);
    }
}

testLazadaApi()