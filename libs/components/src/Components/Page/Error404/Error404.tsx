import React from 'react'

import { useTranslation } from 'react-i18next'

import { SANTypography } from '../../Atoms/Typography'
import { SANBox } from '../../Atoms/Box'
import { SANButton } from '../../Atoms/Button'

import { useThemeContext } from '@sanar/utils/dist/Hooks'

export interface ISANError404Props {}

const SANError404: React.FC = ({ children }) => {
    const {
        assets: {
            icons: {
                errors: { error404 }
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
            px={{ xs: ' 8', _: '40px' }}
            height='100%'
            position='relative'
            bg='white.10'
        >
            <SANBox
                display='flex'
                flexDirection='column'
                alignItems='center'
                mt={{ xs: '0', _: '8' }}
            >
                <SANBox
                    src={error404}
                    as='img'
                    width={{ xs: '530px', _: '240px' }}
                    mb='xxl'
                />
                <SANTypography
                    fontWeight='bold'
                    fontSize={{ xs: '30px', _: 'lg' }}
                    textAlign='center'
                >
                    {t('error404.title')}
                </SANTypography>
                <SANTypography
                    fontSize={{ xs: 'xl', _: 'sm' }}
                    textAlign='center'
                    mb='xl'
                >
                    {t('error404.subtitle')}
                </SANTypography>
                {children}
            </SANBox>
            <SANBox
                position={{ xs: 'inherit', _: 'absolute' }}
                bottom={{ xs: 'auto', _: 'xxl' }}
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
                >
                    {t('error404.button')}
                </SANButton>
            </SANBox>
        </SANBox>
    )
}

export default SANError404
