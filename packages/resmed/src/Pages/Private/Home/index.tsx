import React from 'react'

import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import { theme } from 'styled-tools'

import {
    SANBox,
    SANTabs,
    SANTabPane,
    SANTypography,
    SANProgress,
    SANLayoutContainer,
    SANCommonBadge,
    SANRow,
    SANCol
} from '@sanar/components'

import RMGeneral from './General'

const TitleCol = styled(SANCol)`
    ${theme('mediaQueries.up.md')} {
        &:after {
            border-right: 1px solid ${theme('colors.grey.2')};
            content: '';
            position: absolute;
            right: 32px;
            height: 100%;
            top: 0;
        }
    }
    ${theme('mediaQueries.down.md')} {
        border-bottom: 1px solid ${theme('colors.grey.2')};
        margin-bottom: ${theme('space.md')};
    }
`

const Header = () => {
    return (
        <SANBox borderBottom='1px solid' borderColor='grey.0'>
            <SANLayoutContainer py={{ md: '8', _: 'md' }}>
                <SANRow type='flex' align='middle'>
                    <TitleCol xs={24} sm={24} md={17}>
                        <SANTypography
                            fontSize={{ md: 'xxl', _: 'lg' }}
                            fontWeight='bold'
                            mb={{ md: '0', _: 'md' }}
                        >
                            Extensivo Sanar Residência Médica
                        </SANTypography>
                    </TitleCol>
                    <SANCol xs={24} sm={24} md={7}>
                        <SANBox>
                            <SANBox
                                display='flex'
                                alignItems='center'
                                justifyContent='space-between'
                                mb='sm'
                            >
                                <SANTypography
                                    fontSize='sm'
                                    fontWeight='bold'
                                    mr='sm'
                                >
                                    Completude do curso
                                </SANTypography>
                                <SANCommonBadge
                                    count={100}
                                    suffix='%'
                                    status='warning'
                                />
                            </SANBox>
                            <SANProgress percent={100} color='secondary' />
                        </SANBox>
                    </SANCol>
                </SANRow>
            </SANLayoutContainer>
        </SANBox>
    )
}

const RMHome = () => {
    const { t } = useTranslation('resmed')

    return (
        <SANBox flex='1' display='flex' flexDirection='column'>
            <Header />
            <SANTabs center defaultActiveKey='1' tabBarGutter={0} flex='1'>
                <SANTabPane
                    tab={
                        <SANTypography
                            fontWeight='bold'
                            fontSize={{ xs: 'lg', _: 'md' }}
                        >
                            {t('home.general.title')}
                        </SANTypography>
                    }
                    key='1'
                >
                    <RMGeneral />
                </SANTabPane>
                <SANTabPane
                    tab={
                        <SANTypography
                            fontWeight='bold'
                            fontSize={{ xs: 'lg', _: 'md' }}
                        >
                            {t('home.about.title')}
                        </SANTypography>
                    }
                    key='2'
                >
                    sobre
                </SANTabPane>
            </SANTabs>
        </SANBox>
    )
}

export default RMHome
