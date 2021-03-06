import {
    AuthenticationDetails,
    CognitoUserSession
} from 'amazon-cognito-identity-js'
import { getInstance } from 'Config/AWSCognito'
import i18n from 'sanar-ui/dist/Config/i18n'
import * as Sentry from '@sentry/browser'

function userHasSubscription(decodedToken): boolean {
    try {
        const products = decodedToken['custom:products'] || []
        return products.includes('sanarflix')
    } catch (error) {
        Sentry.captureException(error)
        return false
    }
}

function signOut() {
    try {
        const user = getInstance().userPool.getCurrentUser()
        !!user && user.signOut()
    } catch (error) {
        Sentry.captureException(error)
    }
}

// TODO: Create custom type to return errors
const signInByEmail = (email, password): Promise<any> => {
    return new Promise((resolve, reject) => {
        const emailLowerCase = email.trim().toLowerCase()
        let authenticationData = {
            Username: emailLowerCase,
            Password: password
        }

        let authenticationDetails = new AuthenticationDetails(
            authenticationData
        )

        getInstance(emailLowerCase).user.authenticateUser(
            authenticationDetails,
            {
                onSuccess: (result: CognitoUserSession) => {
                    if (
                        userHasSubscription(result.getIdToken().decodePayload())
                    ) {
                        resolve(result)
                    } else {
                        signOut()
                        reject({
                            code: 'UserLambdaValidationException',
                            message: i18n.t('sanarui:authMessages.noEnrollment')
                        })
                    }
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
                                message: i18n.t(
                                    'sanarui:authMessages.noEnrollment'
                                )
                            })
                        default:
                            return reject({
                                code: err.code,
                                message: i18n.t('sanarui:authMessages.generic')
                            })
                    }
                }
            }
        )
    })
}

export default signInByEmail
