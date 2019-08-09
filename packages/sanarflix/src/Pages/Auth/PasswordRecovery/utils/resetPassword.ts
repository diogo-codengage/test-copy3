import { getInstance } from 'Config/AWSCognito'
import { message } from 'antd'
import i18n from 'sanar-ui/dist/Config/i18n'

const resetPassword = (email, code, password) => {
    return new Promise((resolve, reject) => {
        getInstance(email).user.confirmPassword(code, password, {
            onSuccess() {
                resolve()
                message.success('Senha redefinida com sucesso!')
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

export default resetPassword
