type FLXCognitoConfigTypes = {
    UserPoolId: string
    ClientId: string
}

const FLXAWSCognitoConfig: FLXCognitoConfigTypes = {
    UserPoolId: process.env.REACT_APP_AWS_COGNITO_USER_POOL_ID || '',
    ClientId: process.env.REACT_APP_AWS_COGNITO_USER_POOL_WEB_CLIENT_ID || ''
}

export default FLXAWSCognitoConfig
