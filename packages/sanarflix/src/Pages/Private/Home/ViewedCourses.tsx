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

import {
    GET_COURSES_LAST_VIEWED,
    ICourses,
    ICourse
} from 'Apollo/Home/Queries/courses-last-viewed'

export const responsive = [
    {
        breakpoint: 1200,
        settings: {
            slidesToShow: 3,
            arrows: false,
            centerMode: true,
            infinite: true
        }
    },
    {
        breakpoint: 576,
        settings: {
            slidesToShow: 2,
            arrows: false,
            centerMode: true,
            infinite: true,
            swipeToSlide: true
        }
    },
    {
        breakpoint: 480,
        settings: {
            slidesToShow: 1,
            arrows: false,
            centerMode: true,
            infinite: true,
            swipeToSlide: true
        }
    }
]

const renderCourse = (course: ICourse) => (
    <div key={course.id}>
        <SANCardCourseModule
            title={course.name}
            badge='70%'
            progress={70}
            actionName={i18n.t('sanarflix:global.viewCourse')}
            image={course.cover_picture_url}
            size='small'
        />
    </div>
)

const Courses = () => {
    return (
        <SANQuery
            query={GET_COURSES_LAST_VIEWED}
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

const FLXViewedCourses = () => {
    const { t } = useTranslation('sanarflix')

    return (
        <>
            <SANLayoutContainer>
                <SANSessionTitle
                    title={t('home.viewedCourses.title')}
                    subtitle={t('home.viewedCourses.subtitle')}
                />
            </SANLayoutContainer>
            <SANLayoutContainer mb={8} fullMobile>
                <Courses />
            </SANLayoutContainer>
        </>
    )
}

export default FLXViewedCourses
