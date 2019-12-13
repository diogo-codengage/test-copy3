import { AuthenticationDetails, CognitoUserSession } from 'amazon-cognito-identity-js'
import { getInstance } from 'Config/AWSCognito'
import i18n from 'sanar-ui/dist/Config/i18n'

function userHasSubscription(token: string): boolean {
  try {
    const userData = JSON.parse(atob(token.split('.')[1]));
    const products = JSON.parse(userData['custom:products']) || [];
    return products.includes('sanarflix');
  } catch (error) {
    // TODO: setup sentry
    // Sentry.captureException(error);
    return false;
  }
}

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
            onSuccess: (result: CognitoUserSession) => {
                if (userHasSubscription(result.getIdToken().getJwtToken())) {
                    resolve(result)
                } else {
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
