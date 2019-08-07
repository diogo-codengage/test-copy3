import {
    CognitoUser,
    AuthenticationDetails,
    CognitoUserPool
} from 'amazon-cognito-identity-js'
import FLXAWSCognitoConfig from 'Config/AWSCognito'
import i18n from 'sanar-ui/dist/Config/i18n'

const signInByEmail = (email, password): Promise<any> => {
    return new Promise((resolve, reject) => {
        const data = FLXAWSCognitoConfig
        var userPool = new CognitoUserPool(data)

        var authenticationData = {
            Username: email,
            Password: password
        }

        var authenticationDetails = new AuthenticationDetails(
            authenticationData
        )

        const userData = {
            Username: email,
            Pool: userPool
        }

        var cognitoUser = new CognitoUser(userData)
        cognitoUser.authenticateUser(authenticationDetails, {
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
