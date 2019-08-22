import React from 'react'

import { useTranslation } from 'react-i18next'

import {
    SANSessionTitle,
    SANCarousel,
    SANCardCourseModule,
    SANLayoutContainer,
    SANQuery
} from '@sanar/components'
import i18n from 'sanar-ui/dist/Config/i18n'

import { responsive } from './ViewedCourses'
import {
    GET_COURSES_LAST_ADDED,
    ICourses,
    ICourse
} from 'Apollo/Home/Queries/courses-last-added'

const renderCourse = (course: ICourse) => (
    <div key={course.id}>
        <SANCardCourseModule
            title={course.name}
            actionName={i18n.t('sanarflix:global.access')}
            image={course.cover_picture_url}
            size='small'
            newBadge
        />
    </div>
)

const Courses = () => {
    return (
        <SANQuery
            query={GET_COURSES_LAST_ADDED}
            loaderProps={{ minHeight: 186, flex: true }}
        >
            {({ data }: { data: ICourses }) => (
                <SANCarousel
                    slidesToShow={4}
                    slidesToScroll={1}
                    initialSlide={0}
                    arrows
                    infinite={false}
                    dots={false}
                    draggable
                    lazyLoad
                    responsive={responsive}
                >
                    {data.courses.data.map(renderCourse)}
                </SANCarousel>
            )}
        </SANQuery>
    )
}

const FLXAddedCourses = () => {
    const { t } = useTranslation('sanarflix')

    return (
        <>
            <SANLayoutContainer>
                <SANSessionTitle
                    title={t('home.addedCourses.title')}
                    subtitle={t('home.addedCourses.subtitle')}
                />
            </SANLayoutContainer>
            <SANLayoutContainer mb={8} fullMobile>
                <Courses />
            </SANLayoutContainer>
        </>
    )
}

export default FLXAddedCourses
