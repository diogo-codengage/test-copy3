import { esConfigureAuthStorage } from 'sanar-ui/dist/Util/Auth'
import debug from 'debug'
const logger = debug('sanar::aws-amplify-config');

const AWSAmplifyConfig = {
    Auth: {
        region: process.env.REACT_APP_AWS_COGNITO_REGION,
        userPoolId: process.env.REACT_APP_AWS_COGNITO_USER_POOL_ID,
        aws_user_pools_id: process.env.REACT_APP_AWS_COGNITO_USER_POOL_ID,
        aws_user_pools_web_client_id:
            process.env.REACT_APP_AWS_COGNITO_USER_POOL_WEB_CLIENT_ID,
        userPoolWebClientId:
            process.env.REACT_APP_AWS_COGNITO_USER_POOL_WEB_CLIENT_ID,
        storage: esConfigureAuthStorage(),
        oauth: {
            domain: 'sanar-dev.auth.us-east-1.amazoncognito.com',
            scope: ['email', 'profile', 'openid'],
            // redirectSignIn: 'https://d2bvrr6jfh8qt0.cloudfront.net/',
            redirectSignIn: 'http://localhost:3000/',
            redirectSignOut: undefined,
            responseType: 'code',
            options: undefined
        }
    }
}

logger('AWS configuration: %o', AWSAmplifyConfig);

export default AWSAmplifyConfig
