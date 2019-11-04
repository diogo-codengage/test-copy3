import React, { useMemo } from 'react'

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

import { useAuthContext } from 'Hooks/auth'

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
    const { t } = useTranslation('resmed')
    const { subscription } = useAuthContext()

    const course = useMemo(() => !!subscription && subscription.activeCourse, [
        subscription
    ])

    return (
        <SANBox borderBottom='1px solid' borderColor='grey.0'>
            <SANLayoutContainer py={{ md: '8', _: 'md' }}>
                <SANRow type='flex' align='middle'>
                    <TitleCol xs={24} sm={24} md={17}>
                        <SANTypography
                            fontSize={{ md: 'xxl', _: 'lg' }}
                            fontWeight='bold'
                            color='black'
                            mb={{ md: '0', _: 'md' }}
                        >
                            {!!course && course.name}
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
                                    {t('home.header.completeness')}
                                </SANTypography>
                                <SANCommonBadge
                                    count={course.progress}
                                    suffix='%'
                                    status='warning'
                                />
                            </SANBox>
                            <SANProgress
                                percent={course.progress}
                                color='secondary'
                                backdrop='grey.1'
                            />
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
