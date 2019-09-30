import React from 'react'
import { useTranslation } from 'react-i18next'

import { useThemeContext } from '@sanar/utils/dist/Hooks'

import { SANTypography } from '../../Atoms/Typography'
import { SANBox, ISANBoxProps } from '../../Atoms/Box'

export interface ISANGenericErrorProps extends ISANBoxProps {
    message?: React.ReactNode | string
    dark?: boolean
}

const SANGenericError = ({
    message,
    dark,
    ...props
}: ISANGenericErrorProps) => {
    const {
        assets: {
            icons: {
                errors: { errorGeneric }
            }
        }
    } = useThemeContext()
    const { t } = useTranslation('components')

    return (
        <SANBox display='flex' flexDirection='column' {...props}>
            <SANBox as='img' src={errorGeneric} mb='lg' />
            <SANTypography
                variant='body1'
                type={dark ? 'light' : 'default'}
                textAlign='center'
            >
                {message || t('genericError.message')}
            </SANTypography>
        </SANBox>
    )
}

export default SANGenericError
