import { Auth } from 'aws-amplify'
import i18n from '../../Config/i18n'

const esSendPasswordRecovery = email => {
    return Auth.forgotPassword(email).catch(error => {
        switch (error.code) {
            case 'LimitExceededException':
                return Promise.reject({
                    code: error.code,
                    message: i18n.t(
                        'sanarui:authMessages.limitExceededException'
                    )
                })
            case 'UserNotFoundException':
                return Promise.reject({
                    code: error.code,
                    message: i18n.t(
                        'sanarui:authMessages.userNotFoundException'
                    )
                })
            case 'InvalidParameterException':
                return Promise.reject({
                    code: error.code,
                    message: i18n.t(
                        'sanarui:authMessages.invalidParameterException'
                    )
                })
            default:
                return Promise.reject({
                    code: error.code,
                    message: i18n.t('sanarui:authMessages.generic')
                })
        }
    })
}

export default esSendPasswordRecovery
