import {
    CognitoUserPool,
    CognitoUser,
    ICognitoUserData,
    ICognitoUserPoolData
} from 'amazon-cognito-identity-js'

const FLXAWSCognitoConfigKeys: ICognitoUserPoolData = {
    UserPoolId: process.env.REACT_APP_AWS_COGNITO_USER_POOL_ID || '',
    ClientId: process.env.REACT_APP_AWS_COGNITO_USER_POOL_WEB_CLIENT_ID || ''
}

let user: CognitoUser
let userEmail: string
let userData: ICognitoUserData
const userPool: CognitoUserPool = new CognitoUserPool(FLXAWSCognitoConfigKeys)

const constructor = email => {
    userEmail = email

    userData = {
        Username: userEmail,
        Pool: userPool
    }

    user = new CognitoUser(userData)
    return { user, userPool }
}

const getStorageEmail = (): string => {
    const emailKey =
        Object.keys(localStorage).find(
            item => item.indexOf('LastAuthUser') > -1
        ) || ''
    return localStorage.getItem(emailKey) || ''
}

const getInstance = (email?: string | null) => {
    const newEmail = email || getStorageEmail()
    if (!user || email !== userEmail) {
        return constructor(newEmail)
    }

    return { user, userPool }
}

export { getInstance }
