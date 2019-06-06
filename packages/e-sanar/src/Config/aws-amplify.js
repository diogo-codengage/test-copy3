const AWSAmplifyConfig = {
    Auth: {
        region: process.env.REACT_APP_AWS_COGNITO_REGION,
        userPoolId: process.env.REACT_APP_AWS_COGNITO_USER_POOL_ID,
        userPoolWebClientId:
            process.env.REACT_APP_AWS_COGNITO_USER_POOL_WEB_CLIENT_ID,
        identityPoolId: process.env.REACT_APP_AWS_COGNITO_IDENTITY_POOL_ID
    }
}

export default AWSAmplifyConfig
