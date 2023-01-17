/**
 * Enviroment Configuration for multiple env
 * this file must be at libs/environment/ and called environment.ts
 */

/* The const must be exported this example does not show this 
 * to avoid problems when this file doesn't exist
 * export const EnvironmentConfiguration 
*/
const EnvironmentConfiguration = {
    dev: {
        api: 'https://xxxxxxxxxx.execute-api.us-east-1.amazonaws.com/stage',
        apikey: 'XXXXXXXXXXXXXX',
        Auth: {
            identityPoolId: 'us-east-1:bb7d6063-23d7-48c1-8cb8-a1661ff7e407',
            region: 'us-east-1',
            userPoolId: 'us-east-1_OS93O10',
            userPoolWebClientId: '1Sin9fna0m4i41243bslbfrnab',
        }
    },
    stage: {
        api: 'https://xxxxxxxxxx.execute-api.us-east-1.amazonaws.com/stage',
        apikey: 'XXXXXXXXXXXXXX',
        Auth: {
            identityPoolId: 'us-east-1:bb7d6063-23d7-48c1-8cb8-a1661ff7e407',
            region: 'us-east-1',
            userPoolId: 'us-east-1_OS93O10',
            userPoolWebClientId: '1Sin9fna0m4i41243bslbfrnab',
        }
    },
    prod: {
        api: 'https://xxxxxxxxxx.execute-api.us-east-1.amazonaws.com/stage',
        apikey: 'XXXXXXXXXXXXXX',
        Auth: {
            identityPoolId: 'us-east-1:bb7d6063-23d7-48c1-8cb8-a1661ff7e407',
            region: 'us-east-1',
            userPoolId: 'us-east-1_OS93O10',
            userPoolWebClientId: '1Sin9fna0m4i41243bslbfrnab',
        }
    }
};
