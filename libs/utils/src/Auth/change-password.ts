import i18n from 'sanar-ui/dist/Config/i18n'

const changePassword = cognitoUser => ({ oldPassword, newPassword }) =>
    new Promise((resolve, reject) =>
        cognitoUser.changePassword(oldPassword, newPassword, function(
            err,
            result
        ) {
            if (err) {
                switch (err.code) {
                    case 'LimitExceededException':
                        return reject({
                            code: err.code,
                            message: i18n.t(
                                'sanarui:authMessages.changePassword.limitExceededException'
                            )
                        })
                    case 'UserNotFoundException':
                        return reject({
                            code: err.code,
                            message: i18n.t(
                                'sanarui:authMessages.changePassword.userNotFoundException'
                            )
                        })
                    case 'NotAuthorizedException':
                        return reject({
                            code: err.code,
                            message: i18n.t(
                                'sanarui:authMessages.changePassword.notAuthorizedException'
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

export default changePassword
