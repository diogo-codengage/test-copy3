import { Auth } from 'aws-amplify'

import i18n from '../../Config/i18n'

const esSignIn = (email, password) => {
    return Auth.signIn(email, password).catch(err => {
        switch (err.code) {
            case 'UserNotFoundException':
                return Promise.reject({
                    code: err.code,
                    message: i18n.t(
                        'sanarui:authMessages.userNotFoundException'
                    )
                })
            case 'NotAuthorizedException':
                return Promise.reject({
                    code: err.code,
                    message: i18n.t(
                        'sanarui:authMessages.notAuthorizedException'
                    )
                })
            default:
                return Promise.reject({
                    code: err.code,
                    message: i18n.t('sanarui:authMessages.generic')
                })
        }
    })
}

export default esSignIn
