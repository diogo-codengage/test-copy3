import React, { useMemo, useCallback, useEffect } from 'react'

import styled from 'styled-components'
import { theme } from 'styled-tools'
import { useTranslation } from 'react-i18next'

import {
    SANLayoutContainer,
    SANBox,
    SANRow,
    SANCol,
    SANTypography,
    SANCollapse,
    SANCollapsePanel,
    SANEvaIcon
} from '@sanar/components'

import aboutSvg from 'Assets/images/home/about.png'

import { useAuthContext } from 'Hooks/auth'

import { useMainContext } from 'Pages/Private/Context'

const SANCollapsePanelStyle = styled(SANCollapsePanel)`
    &&& {
        & > .ant-collapse-header {
            padding: ${theme('space.xl')};
            padding-right: 56px;

            & i {
                right: ${theme('space.xl')};
            }
        }

        &.ant-collapse-item-active > .ant-collapse-header {
            background-color: ${theme('colors.grey.0')};
        }
    }
`

const SANCollapselStyle = styled(SANCollapse)`
    &&& {
        background-color: ${theme('colors.white.10')};
    }
`

const RMAbout = () => {
    const { t } = useTranslation('resmed')
    const { activeCourse } = useAuthContext()
    const { handleTrack } = useMainContext()

    useEffect(() => {
        handleTrack('Informações do Curso Viewed')
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const infos = useMemo(() => (!!activeCourse && activeCourse.infos) || [], [
        activeCourse
    ])

    const renderInfo = useCallback(
        (info, index) => (
            <SANCollapsePanelStyle
                header={
                    <SANTypography fontSize='lg' fontWeight='bold'>
                        {info.title}
                    </SANTypography>
                }
                customKey={index}
            >
                <span dangerouslySetInnerHTML={{ __html: info.body }} />
            </SANCollapsePanelStyle>
        ),
        []
    )

    const texts = useMemo(
        () => (
            <>
                <SANTypography fontSize='md' mb='xxl'>
                    {t('home.about.texts.paragraph1')}
                </SANTypography>
                <SANTypography fontSize='md'>
                    {t('home.about.texts.paragraph2')}
                </SANTypography>
            </>
        ),
        [t]
    )

    return (
        <SANBox mt={8} mb={9}>
            <SANLayoutContainer>
                <SANRow gutter={24}>
                    <SANCol xs={24} sm={24} md={12}>
                        <SANTypography
                            fontSize='xl'
                            fontWeight='bold'
                            mb='xs'
                            color='grey.7'
                        >
                            {t('home.about.texts.title')}
                        </SANTypography>
                        <SANTypography
                            fontSize='md'
                            mb={{ xs: 'xxl', _: 'md' }}
                            color='grey.5'
                        >
                            {t('home.about.texts.subtitle')}
                        </SANTypography>
                        <SANBox display={{ md: 'block', _: 'none' }}>
                            {texts}
                        </SANBox>
                    </SANCol>
                    <SANCol xs={24} sm={24} md={12}>
                        <SANBox as='img' src={aboutSvg} width='100%' />
                    </SANCol>
                </SANRow>

                <SANBox display={{ md: 'none', _: 'block' }} mt='md'>
                    {texts}
                </SANBox>

                <SANCollapselStyle
                    mt={{ md: 'xxl', _: 'xl' }}
                    expandIconPosition='right'
                    expandIcon={props =>
                        props.isActive ? (
                            <SANEvaIcon name='arrow-ios-downward-outline' />
                        ) : (
                            <SANEvaIcon name='arrow-ios-forward-outline' />
                        )
                    }
                >
                    {infos.map(renderInfo)}
                </SANCollapselStyle>
            </SANLayoutContainer>
        </SANBox>
    )
}

export default RMAbout
