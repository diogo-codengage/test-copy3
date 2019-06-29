import React, { useState } from 'react'

import ESHelpCenterTemplate from 'sanar-ui/dist/Components/Templates/HelpCenter'
import ESInput from 'sanar-ui/dist/Components/Atoms/Input'
import ESButton from 'sanar-ui/dist/Components/Atoms/Button'

import image from 'assets/images/auth/chest.png'
import ESForm, {
    ESFormItem,
    withESForm
} from 'sanar-ui/dist/Components/Molecules/Form'
import { message } from 'antd'
import { useTranslation } from 'react-i18next'
import { Auth } from 'aws-amplify'

const SANMyAccountHelpCenter = ({ history, form }) => {
    const { t } = useTranslation()

    return (
        <ESHelpCenterTemplate actionsMargin='large'/>
    )
}

export default withESForm(SANMyAccountHelpCenter)
