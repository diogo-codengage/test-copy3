import { Auth } from 'aws-amplify'
import i18n from '../../Config/i18n'

const sendPasswordReset = (password, email, code) => {
    return Auth.forgotPasswordSubmit(email, code, password)
        .then(res => {
            return Promise.resolve({
                message: i18n.t('sanarui:authMessages.passwordWasReseted')
            })
        })
        .catch(err => {
            switch (err.code) {
                case 'ExpiredCodeException':
                    return Promise.reject({
                        code: 'ExpiredCodeException',
                        message: i18n.t(
                            'sanarui:authMessages.expiredCodeException'
                        )
                    })
                case 'CodeMismatchException':
                    return Promise.reject({
                        code: 'CodeMismatchException',
                        message: i18n.t(
                            'sanarui:authMessages.codeMismatchException'
                        )
                    })
                case 'LimitExceededException':
                    return Promise.reject({
                        code: 'LimitExceededException',
                        message: i18n.t(
                            'sanarui:authMessages.limitExceededException'
                        )
                    })
                default:
                    return Promise.reject({
                        code: 'Generic',
                        message: i18n.t('sanarui:authMessages.generic')
                    })
            }
        })
}

export default sendPasswordReset
