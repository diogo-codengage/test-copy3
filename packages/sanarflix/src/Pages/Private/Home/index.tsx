import React, { useEffect } from 'react'

import { useTranslation } from 'react-i18next'
import { withRouter, RouteComponentProps } from 'react-router-dom'

import { SANRow, SANCol, SANLayoutContainer, SANBox } from '@sanar/components'

import FLXViewedCourses from './ViewedCourses'
import FLXAddedContents from './AddedContents'

import FLXBanner from 'Components/Banner'
import { events } from 'Config/Segment'

import allCourses from 'Assets/images/banners/all-courses.png'
import baseQuestions from 'Assets/images/banners/base-questions.png'
import indicate from 'Assets/images/banners/indicate.png'
import indicateMobile from 'Assets/images/banners/indicate-mobile.png'

const intl = 'home.banners'

const FLXHome = ({ history }: RouteComponentProps) => {
    const { t } = useTranslation('sanarflix')

    useEffect(() => {
        window.analytics.page(
            events['Page Viewed'].event,
            events['Page Viewed'].data
        )
    }, [])

    return (
        <SANBox bg='grey-solid.1' flex='1'>
            <SANLayoutContainer pt={8}>
                <SANRow gutter={16}>
                    <SANCol xs={24} md={12}>
                        <FLXBanner
                            mb={8}
                            SessionTitleProps={{
                                title: t(`${intl}.allCourses.title`),
                                subtitle: t(`${intl}.allCourses.subtitle`)
                            }}
                            BannerProps={{
                                title: t(`${intl}.allCourses.title`),
                                image: allCourses,
                                ButtonProps: {
                                    children: t(`${intl}.allCourses.action`),
                                    'data-testid': 'banner-all-courses',
                                    onClick: () =>
                                        history.push('/portal/cursos')
                                }
                            }}
                        />
                    </SANCol>
                    <SANCol xs={24} md={12}>
                        <FLXBanner
                            mb={8}
                            SessionTitleProps={{
                                title: t(`${intl}.questionsBase.title`),
                                subtitle: t(`${intl}.questionsBase.subtitle`)
                            }}
                            BannerProps={{
                                title: t(`${intl}.questionsBase.title`),
                                image: baseQuestions,
                                ButtonProps: {
                                    children: t(`${intl}.questionsBase.action`),
                                    'data-testid': 'banner-questions-database',
                                    onClick: () =>
                                        history.push(
                                            '/portal/banco-questoes/filtro'
                                        )
                                }
                            }}
                        />
                    </SANCol>
                </SANRow>
            </SANLayoutContainer>
            <FLXViewedCourses />
            <FLXAddedContents />
            <SANLayoutContainer pb={8}>
                <FLXBanner
                    SessionTitleProps={{
                        title: t(`${intl}.indicate.title`),
                        subtitle: t(`${intl}.indicate.subtitle`)
                    }}
                    BannerProps={{
                        title: t(`${intl}.indicate.title`),
                        image: indicate,
                        mobile: indicateMobile,
                        ButtonProps: {
                            children: t(`${intl}.indicate.action`),
                            'data-testid': 'banner-questions-indicate'
                        }
                    }}
                />
            </SANLayoutContainer>
        </SANBox>
    )
}

export default withRouter(FLXHome)
