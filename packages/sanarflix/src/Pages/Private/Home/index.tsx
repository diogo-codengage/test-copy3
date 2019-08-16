import React from 'react'

import { useTranslation } from 'react-i18next'

import {
    SANRow,
    SANCol
} from '@sanar/components/dist/Components/Molecules/Grid'
import { SANLayoutContainer } from '@sanar/components/dist/Components/Organisms/Layout'

import FLXViewedCourses from './ViewedCourses'
import FLXAddedCourses from './AddedCourses'

import FLXBanner from 'Components/Banner'

import allCourses from 'Assets/images/banners/all-courses.png'
import baseQuestions from 'Assets/images/banners/base-questions.png'

const intl = 'home.banners'

const FLXHome: React.FC = () => {
    const { t } = useTranslation('sanarflix')

    return (
        <>
            <SANLayoutContainer mt={8}>
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
                                    children: t(`${intl}.allCourses.action`)
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
                                    children: t(`${intl}.questionsBase.action`)
                                }
                            }}
                        />
                    </SANCol>
                </SANRow>
            </SANLayoutContainer>
            <FLXViewedCourses />
            <FLXAddedCourses />
            <SANLayoutContainer mb={8}>
                <FLXBanner
                    SessionTitleProps={{
                        title: t(`${intl}.indicate.title`),
                        subtitle: t(`${intl}.indicate.subtitle`)
                    }}
                    BannerProps={{
                        title: t(`${intl}.indicate.title`),
                        image: allCourses,
                        ButtonProps: {
                            children: t(`${intl}.indicate.action`)
                        }
                    }}
                />
            </SANLayoutContainer>
        </>
    )
}

export default FLXHome
