import React from 'react'

import { useTranslation } from 'react-i18next'

import { SANTypography } from '../../Atoms/Typography'
import { SANBox } from '../../Atoms/Box'
import { SANButton } from '../../Atoms/Button'

import { useThemeContext } from '@sanar/utils/dist/Hooks'

export interface ISANError500Props {
    onClick: () => void
    text?: React.ReactNode | string
}

const SANError500: React.FC<ISANError500Props> = ({
    children,
    onClick,
    text
}) => {
    const {
        assets: {
            icons: {
                errors: { error500 }
            }
        }
    } = useThemeContext()
    const { t } = useTranslation('components')

    return (
        <SANBox
            display='flex'
            flexDirection='column'
            alignItems='center'
            justifyContent={{ xs: 'center', _: 'flex-start' }}
            py='xxl'
            px={{ xs: '8', _: '40px' }}
            height='100%'
            position='relative'
            bg='white.10'
            flex='1'
        >
            <SANBox
                display='flex'
                flexDirection='column'
                alignItems='center'
                mt={{ xs: '0', _: '8' }}
                maxWidth='650px'
            >
                <SANBox
                    src={error500}
                    as='img'
                    width={{ xs: '380px', _: '220px' } as any}
                    mb='xxl'
                />
                <SANTypography
                    fontWeight='bold'
                    fontSize={{ xs: '30px', _: 'xl' }}
                    textAlign='center'
                >
                    {t('error500.title')}
                </SANTypography>
                <SANTypography
                    fontSize={{ xs: 'xl', _: 'md' }}
                    textAlign='center'
                    mb='xl'
                >
                    {t('error500.subtitle')}
                </SANTypography>
                {children}
            </SANBox>
            <SANBox
                position={{ xs: 'inherit', _: 'absolute' }}
                bottom={{ xs: 'auto', _: 'xl' }}
                left={{ xs: 'auto', _: '40px' }}
                right={{ xs: 'auto', _: '40px' }}
            >
                <SANButton
                    variant='solid'
                    color='primary'
                    uppercase
                    bold
                    block
                    mt='xl'
                    onClick={onClick}
                >
                    {text || t('error500.button')}
                </SANButton>
            </SANBox>
        </SANBox>
    )
}

export default SANError500
