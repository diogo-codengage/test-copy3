import { esConfigureAuthStorage } from 'sanar-ui/dist/Util/Auth'

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
            scope: ['email', 'profile'],
            redirectSignIn: 'https://a3192596.ngrok.io/',
            redirectSignOut: undefined,
            responseType: 'code',
            options: undefined
        }
    }
}

export default AWSAmplifyConfig
