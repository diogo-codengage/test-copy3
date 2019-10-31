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

// The primary method for verifying/starting a CoginotID session
const getAccessToken = () => {
    const cognitoUser = getCognitoUser()

    if (!!cognitoUser) {
        cognitoUser.getSession((err: any, session: CognitoUserSession) => {
            if (session.isValid()) {
                console.log(session.getIdToken().getJwtToken())
                return session.getIdToken().getJwtToken()
            }
            cognitoUser.refreshSession(session.getRefreshToken(), () => {})
        })
    }
}

const logout = ({ callback }: { callback?: Function }) => {
    const cognitoUser = getCognitoUser()
    if (!cognitoUser) {
        return
    }
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

    return new Promise((resolve, reject) => {
        user.authenticateUser(authenticationDetails, {
            onSuccess: result => {
                return resolve(result)
            },
            onFailure: err => {
                switch (err.code) {
                    case 'UserNotFoundException':
                        return reject({
                            code: err.code,
                            message: i18n.t(
                                'sanarui:authMessages.userNotFoundException'
                            )
                        })
                    case 'NotAuthorizedException':
                        return reject({
                            code: err.code,
                            message: i18n.t(
                                'sanarui:authMessages.notAuthorizedException'
                            )
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
        cognitoUser.changePassword(oldPassword, newPassword, function(
            err: any,
            result
        ) {
            if (err) {
                switch (err) {
                    case 'LimitExceededException':
                        return reject({
                            code: err.code,
                            message: i18n.t(
                                'sanarui:authMessages.limitExceededException'
                            )
                        })
                    case 'UserNotFoundException':
                        return reject({
                            code: err.code,
                            message: i18n.t(
                                'sanarui:authMessages.userNotFoundException'
                            )
                        })
                    default:
                        return reject({
                            code: err.code,
                            message: i18n.t('sanarui:authMessages.generic')
                        })
                }
            }
            resolve(result)
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
            onSuccess: () => {
                resolve()
            },
            onFailure: (error: any) => {
                switch (error.code) {
                    case 'LimitExceededException':
                        return reject({
                            code: error.code,
                            message: i18n.t(
                                'sanarui:authMessages.limitExceededException'
                            )
                        })
                    case 'UserNotFoundException':
                        return reject({
                            code: error.code,
                            message: i18n.t(
                                'sanarui:authMessages.userNotFoundException'
                            )
                        })
                    case 'InvalidParameterException':
                        return reject({
                            code: error.code,
                            message: i18n.t(
                                'sanarui:authMessages.invalidParameterException'
                            )
                        })
                    default:
                        return reject({
                            code: error.code,
                            message: i18n.t('sanarui:authMessages.generic')
                        })
                }
            }
        })
    })
}

const resetPassword = ({
    verificationCode,
    newPassword
}: {
    verificationCode: string
    newPassword: string
}) => {
    const cognitoUser = getCognitoUser()
    if (!cognitoUser) {
        return
    }

    return new Promise((resolve, reject) => {
        cognitoUser.confirmPassword(verificationCode, newPassword, {
            onSuccess() {
                resolve()
            },
            onFailure: (err: any) => {
                switch (err.code) {
                    case 'ExpiredCodeException':
                        return reject({
                            code: 'ExpiredCodeException',
                            message: i18n.t(
                                'sanarui:authMessages.expiredCodeException'
                            )
                        })
                    case 'CodeMismatchException':
                        return reject({
                            code: 'CodeMismatchException',
                            message: i18n.t(
                                'sanarui:authMessages.codeMismatchException'
                            )
                        })
                    case 'LimitExceededException':
                        return reject({
                            code: 'LimitExceededException',
                            message: i18n.t(
                                'sanarui:authMessages.limitExceededException'
                            )
                        })
                    default:
                        return reject({
                            code: 'Generic',
                            message: i18n.t('sanarui:authMessages.generic')
                        })
                }
            }
        })
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
    resetPassword
}
