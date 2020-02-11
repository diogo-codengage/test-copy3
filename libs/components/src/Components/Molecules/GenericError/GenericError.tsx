import React from 'react'
import { useTranslation } from 'react-i18next'

import { useThemeContext } from '@sanar/utils/dist/Hooks'

import { SANTypography, ISANTypographyProps } from '../../Atoms/Typography'
import { SANBox, ISANBoxProps } from '../../Atoms/Box'

export interface ISANGenericErrorProps extends ISANBoxProps {
    message?: React.ReactNode | string
    dark?: boolean
    TypographyProps?: ISANTypographyProps
    ImageProps?: ISANBoxProps
}

const SANGenericError = ({
    message,
    dark,
    TypographyProps,
    ImageProps,
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
        <SANBox
            display='flex'
            flexDirection='column'
            justifyContent='center'
            m='0 auto'
            {...props}
        >
            <SANBox as='img' src={errorGeneric} mb='lg' {...ImageProps} />
            <SANTypography
                variant='body1'
                type={dark ? 'light' : 'default'}
                textAlign='center'
                {...TypographyProps}
            >
                {message || t('genericError.message')}
            </SANTypography>
        </SANBox>
    )
}

export default SANGenericError
