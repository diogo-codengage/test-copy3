import React from 'react'

import { withRouter, RouteComponentProps } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import { SANChangePassword, useSnackbarContext } from '@sanar/components'

import { changePassword } from 'Config/AWSCognito'

const RMChangePassword = ({ history }: RouteComponentProps) => {
    const { t } = useTranslation('resmed')
    const createSnackbar = useSnackbarContext()

    const handleSubmit = async (
        { old: oldPassword, new: newPassword },
        { setSubmitting }
    ) => {
        try {
            await changePassword({
                oldPassword,
                newPassword
            })
            createSnackbar({
                message: t('changePassword.feedback.success'),
                theme: 'success'
            })
            history.push('/inicio/curso')
        } catch (err) {
            createSnackbar({
                message: err.message,
                theme: 'error'
            })
        }

        setSubmitting(false)
    }

    return <SANChangePassword onSubmit={handleSubmit} />
}

export default withRouter<RouteComponentProps>(RMChangePassword)
