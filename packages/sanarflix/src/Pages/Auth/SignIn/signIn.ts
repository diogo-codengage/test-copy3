import { AuthenticationDetails } from 'amazon-cognito-identity-js'
import { getInstance } from 'Config/AWSCognito'
import i18n from 'sanar-ui/dist/Config/i18n'

// TODO: Create custom type to return errors
const signInByEmail = (email, password): Promise<any> => {
    return new Promise((resolve, reject) => {
        let authenticationData = {
            Username: email,
            Password: password
        }

        let authenticationDetails = new AuthenticationDetails(
            authenticationData
        )

        getInstance(email).user.authenticateUser(authenticationDetails, {
            onSuccess: () => {
                resolve()
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

export default signInByEmail
