import {
    CognitoUserPool,
    CognitoUser,
    ICognitoUserData,
    ICognitoUserPoolData
} from 'amazon-cognito-identity-js'
import * as Sentry from '@sentry/browser'

const FLXAWSCognitoConfigKeys: ICognitoUserPoolData = {
    UserPoolId: process.env.REACT_APP_AWS_COGNITO_USER_POOL_ID || '',
    ClientId: process.env.REACT_APP_AWS_COGNITO_USER_POOL_WEB_CLIENT_ID || ''
}

let user: CognitoUser
let userEmail: string
let userData: ICognitoUserData
const userPool: CognitoUserPool = new CognitoUserPool(FLXAWSCognitoConfigKeys)

export function parseJWTToken(token: string): object {
    try {
        const base64Url = token.split('.')[1]
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
        const jsonPayload = decodeURIComponent(
            atob(base64)
                .split('')
                .map(function(c) {
                    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
                })
                .join('')
        )

        return JSON.parse(jsonPayload)
    } catch (error) {
        Sentry.configureScope(scope => {
            scope.setExtra('jwt_token', token)
        })
        Sentry.captureException(error)
      return {};
    }
}

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
