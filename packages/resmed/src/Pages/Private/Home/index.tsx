import React from 'react'
import { useTranslation } from 'react-i18next'

import {
    SANBox,
    SANTabs,
    SANTabPane,
    SANTypography,
    SANLayoutContainer
} from '@sanar/components'

const Header = () => {
    return (
        <SANBox>
            <SANLayoutContainer>
                <SANTypography fontSize={{ xs: 'xxl', _: 'md' }}>
                    Extensivo Sanar Residência Médica
                </SANTypography>
            </SANLayoutContainer>
        </SANBox>
    )
}

const RMHome = () => {
    const { t } = useTranslation('resmed')

    return (
        <SANBox>
            <Header />
            <SANTabs center defaultActiveKey='1' tabBarGutter={0}>
                <SANTabPane tab={t('home.general.title')} key='1'>
                    geral
                </SANTabPane>
                <SANTabPane tab={t('home.about.title')} key='2'>
                    sobre
                </SANTabPane>
            </SANTabs>
        </SANBox>
    )
}

export default RMHome
