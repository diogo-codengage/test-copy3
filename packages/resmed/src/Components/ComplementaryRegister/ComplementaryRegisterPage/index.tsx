import React from 'react'

import { useTranslation } from 'react-i18next'
import { useWindowSize } from '@sanar/utils/dist/Hooks'

import { RMComplementaryRegisterForm } from '../'

import { SANBox, SANPage, SANTypography } from '@sanar/components'

const RMComplementaryRegisterPage = ({ history }) => {
    const { t } = useTranslation('resmed')
    const { width } = useWindowSize()

    return (
        <SANPage
            hasContainer
            BoxProps={{
                bg: 'grey-solid.1',
                flex: '1',
                py: { sm: '8' },
                px: '0',
                pb: { _: '0', sm: '8' }
            }}
            HeaderProps={{
                onBack: () => history.push('/inicio/curso'),
                SessionTitleProps: {
                    title: t('userProfile.title'),
                    subtitle: t('userProfile.pageSubtitle')
                }
            }}
            ContainerProps={{
                paddingLeft: width < 576 ? '0' : 'md',
                paddingRight: width < 576 ? '0' : 'md'
            }}
        >
            <SANBox
                maxWidth={{ _: '100%', sm: '744px' }}
                marginLeft='auto'
                marginRight='auto'
            >
                <SANTypography
                    fontSize='lg'
                    color='grey.6'
                    mb='xl'
                    px={{ _: 'md', sm: '0' }}
                    pt={{ _: 'md', sm: '0' }}
                >
                    {t('userProfile.pagePresentation')}
                </SANTypography>
                <SANBox
                    bg='white.10'
                    borderRadius={{ sm: 'base', _: '0' }}
                    border='1px solid'
                    borderColor='grey.2'
                    boxShadow='1'
                    px={{ _: 'md', sm: '60px' }}
                    py={{ _: 'xl', sm: 'xxxl' }}
                >
                    <RMComplementaryRegisterForm />
                </SANBox>
            </SANBox>
        </SANPage>
    )
}

export default RMComplementaryRegisterPage
