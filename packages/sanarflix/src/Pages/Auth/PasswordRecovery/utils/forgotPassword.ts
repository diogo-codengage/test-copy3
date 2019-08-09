import { getInstance } from 'Config/AWSCognito'
import i18n from 'sanar-ui/dist/Config/i18n'

const forgotPassword = email => {
    return new Promise((resolve, reject) => {
        getInstance(email).user.forgotPassword({
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

export default forgotPassword

// switch (error.code) {
//   case 'LimitExceededException':
//     return Promise.reject({
//         code: error.code,
//         message: i18n.t(
//             'sanarui:authMessages.limitExceededException'
//         )
//     })
// case 'UserNotFoundException':
//     return Promise.reject({
//         code: error.code,
//         message: i18n.t(
//             'sanarui:authMessages.userNotFoundException'
//         )
//     })
// case 'InvalidParameterException':
//     return Promise.reject({
//         code: error.code,
//         message: i18n.t(
//             'sanarui:authMessages.invalidParameterException'
//         )
//     })
// default:
//     return Promise.reject({
//         code: error.code,
//         message: i18n.t('sanarui:authMessages.generic')
//     })
// }
