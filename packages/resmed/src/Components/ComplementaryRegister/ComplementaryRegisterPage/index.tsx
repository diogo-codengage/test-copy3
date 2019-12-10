import React, { useState, useRef, useMemo } from 'react'

import { useTranslation } from 'react-i18next'

import {
    SANBox,
    SANPage,
    SANForm,
    SANInput,
    SANModal,
    SANButton,
    SANSelect,
    SANTypography,
    SANRadioButton,
    SANSelectFilter
} from '@sanar/components'

import styled from 'styled-components'
import { theme } from 'styled-tools'

const RMPage = ({ history, form, update }) => {
    const { t } = useTranslation('resmed')

    return (
        <SANPage
            hasContainer
            BoxProps={{
                bg: 'grey-solid.1',
                flex: '1',
                py: { xs: '8', _: 'md' }
            }}
            HeaderProps={
                update && {
                    onBack: () => history.goBack(),
                    SessionTitleProps: {
                        title: t('paymentMethods.title'),
                        subtitle: t('paymentMethods.subtitle')
                    }
                }
            }
        >
            <SANBox>
                {update && (
                    <SANTypography>
                        {t('userProfile.updatePresentation')}
                    </SANTypography>
                )}
                <SANModal></SANModal>
            </SANBox>
        </SANPage>
    )
}

export default RMPage
