import React, { useState } from 'react'

import { compose } from 'ramda'
import { withRouter } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import { theme } from 'styled-tools'
import { useApolloClient } from '@apollo/react-hooks'

import {
    SANTypography,
    SANPage,
    SANSessionTitle,
    SANRow,
    SANCol,
    SANBox,
    SANForm,
    SANFormItem,
    withSANForm,
    SANInput,
    SANInputMask,
    SANSelect,
    SANSelectOption,
    SANDivider,
    SANButton,
    SANEvaIcon,
    SANTooltip,
    SANSpin,
    useSnackbarContext
} from '@sanar/components'

import i18n from 'sanar-ui/dist/Config/i18n'

import { useAuthContext } from 'Hooks/auth'


const FLXChangePassword = ({ history, form }) => {
    const { t } = useTranslation('sanarflix')
    const { me } = useAuthContext()

    return (
    )
}


export default FLXChangePassword
