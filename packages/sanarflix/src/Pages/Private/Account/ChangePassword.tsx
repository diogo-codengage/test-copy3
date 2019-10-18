import React, { useEffect } from 'react'

import { withRouter, RouteComponentProps } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { SANChangePassword, useSnackbarContext } from '@sanar/components'
import { changePassword } from '@sanar/utils/dist/Auth'

import { getInstance } from 'Config/AWSCognito'
import { events } from 'Config/Segment'

const FLXChangePassword = ({ history }: RouteComponentProps) => {
    const { t } = useTranslation('sanarflix')
    const snackbar = useSnackbarContext()

    const handleSubmit = (
        { old: oldPassword, new: newPassword },
        { setSubmitting }
    ) => {
        const config = getInstance()
        const cognitoUser = config.userPool.getCurrentUser()

        if (!!cognitoUser) {
            cognitoUser.getSession(async (_, session) => {
                if (session.isValid()) {
                    try {
                        await changePassword(cognitoUser)({
                            oldPassword,
                            newPassword
                        })
                        snackbar({
                            message: t('changePassword.feedback.success'),
                            theme: 'success'
                        })
                    } catch (err) {
                        snackbar({
                            message: err.message,
                            theme: 'error'
                        })
                    }
                }
            })
        }

        setSubmitting(false)
    }

    useEffect(() => {
        window.analytics.page(
            events['Page Viewed'].event,
            events['Page Viewed'].data
        )
    }, [])

    return (
        <SANChangePassword
            onSubmit={handleSubmit}
            onForgot={() => history.push('/auth/recuperar-senha')}
        />
    )
}

export default withRouter(FLXChangePassword)
