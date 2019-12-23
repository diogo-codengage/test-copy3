import {
    CognitoUserPool,
    CognitoUser,
    CognitoUserSession,
    AuthenticationDetails,
    ICognitoUserPoolData
} from 'amazon-cognito-identity-js'

import i18n from 'sanar-ui/dist/Config/i18n'

const config: ICognitoUserPoolData = {
    UserPoolId: process.env.REACT_APP_AWS_COGNITO_USER_POOL_ID || '',
    ClientId: process.env.REACT_APP_AWS_COGNITO_USER_POOL_WEB_CLIENT_ID || ''
}

let sessionUserAttributes
let cognitoUserSingleton

const onFailure = reject => (err: any) => {
    switch (err.code) {
        case 'LimitExceededException':
            return reject({
                code: err.code,
                message: i18n.t('sanarui:authMessages.limitExceededException')
            })
        case 'ExpiredCodeException':
            return reject({
                code: 'ExpiredCodeException',
                message: i18n.t('sanarui:authMessages.expiredCodeException')
            })
        case 'CodeMismatchException':
            return reject({
                code: 'CodeMismatchException',
                message: i18n.t('sanarui:authMessages.codeMismatchException')
            })
        case 'UserNotFoundException':
            return reject({
                code: err.code,
                message: i18n.t('sanarui:authMessages.userNotFoundException')
            })
        case 'InvalidParameterException':
            return reject({
                code: err.code,
                message: i18n.t(
                    'sanarui:authMessages.invalidParameterException'
                )
            })
        case 'NotAuthorizedException':
            return reject({
                code: err.code,
                message: i18n.t('sanarui:authMessages.notAuthorizedException')
            })
        case 'UserLambdaValidationException':
            return reject({
                code: err.code,
                message: i18n.t('sanarui:authMessages.noEnrollment')
            })
        default:
            return reject({
                code: err.code,
                message: i18n.t('sanarui:authMessages.generic')
            })
    }
}

// Gets a User Pool instance
const getUserPool = () => new CognitoUserPool(config)

// Gets user attributes based on the passed cognitoUser
const getUserAttributes = (user: CognitoUser) => {
    return user.getUserAttributes((err, result) => {
        if (err) {
            return
        }
        return result
    })
}

// Gets a cognito user
const getCognitoUser = () => {
    const pool = getUserPool()
    return pool.getCurrentUser()
}

const getStorageEmail = (): string => {
    const emailKey =
        Object.keys(localStorage).find(
            item => item.indexOf('LastAuthUser') > -1
        ) || ''
    return localStorage.getItem(emailKey) || ''
}

// The primary method for verifying/starting a CoginotID session
const getAccessToken = () => {
    const user = new CognitoUser({
        Username: getStorageEmail(),
        Pool: getUserPool()
    })

    return new Promise((resolve, reject) => {
        try {
            user.getSession((err, session: CognitoUserSession) => {
                if (!!err) {
                    console.error('[getSession:err]', err)
                    if (!!session) {
                        console.error('[getSession:session]', session)
                        const refreshToken = session.getRefreshToken()
                        user.refreshSession(refreshToken, function(
                            err,
                            session
                        ) {
                            console.error('[refreshSession]', err, session)
                            return resolve(session.getIdToken().getJwtToken())
                        })
                    } else {
                        return reject(err)
                    }
                }
                const jwtToken = session.getIdToken().getJwtToken()
                return resolve(jwtToken)
            })
        } catch (e) {
            window.localStorage.clear()
            return reject(e)
        }
    })
}

const logout = ({ callback }: { callback?: Function }) => {
    const cognitoUser = getCognitoUser()
    if (!cognitoUser) {
        return
    }
    window.localStorage.clear()
    cognitoUser.signOut()
    !!callback && callback()
}

const login = (email: string, password: string) => {
    const authenticationDetails = new AuthenticationDetails({
        Username: email,
        Password: password
    })

    const user = new CognitoUser({
        Username: email,
        Pool: getUserPool()
    })

    cognitoUserSingleton = user

    return new Promise((resolve, reject) => {
        user.authenticateUser(authenticationDetails, {
            onSuccess: resolve,
            onFailure: onFailure(reject),
            newPasswordRequired: userAttributes => {
                delete userAttributes.email_verified
                sessionUserAttributes = userAttributes
                return resolve({ newPasswordRequired: true })
            }
        })
    })
}

const changePassword = ({
    oldPassword,
    newPassword
}: {
    oldPassword: string
    newPassword: string
}) => {
    const cognitoUser = getCognitoUser()
    if (!cognitoUser) {
        return
    }

    return new Promise((resolve, reject) =>
        cognitoUser.getSession((_, session: CognitoUserSession) => {
            if (session.isValid()) {
                cognitoUser.changePassword(oldPassword, newPassword, function(
                    err: any,
                    result
                ) {
                    err && onFailure(reject)(err)
                    return resolve(result)
                })
            }
        })
    )
}

const forgotPassword = (email: string) => {
    const cognitoUser = new CognitoUser({
        Username: email,
        Pool: getUserPool()
    })

    return new Promise((resolve, reject) => {
        cognitoUser.forgotPassword({
            onSuccess: resolve,
            onFailure: onFailure(reject)
        })
    })
}

const resetPassword = ({
    verificationCode,
    newPassword,
    email
}: {
    verificationCode: string
    newPassword: string
    email: string
}) => {
    const cognitoUser = new CognitoUser({
        Username: email,
        Pool: getUserPool()
    })

    return new Promise((resolve, reject) => {
        cognitoUser.confirmPassword(verificationCode, newPassword, {
            onSuccess: resolve,
            onFailure: onFailure(reject)
        })
    })
}

const handleNewPassword = (newPassword: string) => {
    if (!cognitoUserSingleton) {
        return
    }

    return new Promise((resolve, reject) => {
        cognitoUserSingleton.completeNewPasswordChallenge(
            newPassword,
            sessionUserAttributes,
            {
                onSuccess: resolve,
                onFailure: onFailure(reject)
            }
        )
    })
}

export {
    getUserPool,
    getUserAttributes,
    getAccessToken,
    getCognitoUser,
    logout,
    login,
    changePassword,
    forgotPassword,
    resetPassword,
    handleNewPassword
}
