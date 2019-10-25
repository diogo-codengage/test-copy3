import React from 'react'

import { useTranslation } from 'react-i18next'
import { withRouter, RouteComponentProps } from 'react-router-dom'

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

export const responsive = size => [
    {
        breakpoint: 1200,
        settings: {
            slidesToShow: 2,
            arrows: false,
            centerMode: true,
            infinite: size > 2,
            swipeToSlide: true
        }
    },
    {
        breakpoint: 576,
        settings: {
            slidesToShow: 2,
            arrows: false,
            centerMode: true,
            infinite: size > 2,
            swipeToSlide: true
        }
    },
    {
        breakpoint: 480,
        settings: {
            slidesToShow: 1,
            arrows: false,
            centerMode: true,
            infinite: size > 1,
            swipeToSlide: true
        }
    }
]

const round = n => Math.round(n)

const renderCourse = history => (course: ICourse) => (
    <div key={course.id}>
        <SANCardCourseModule
            title={course.name}
            badge={`${round(course.progress_percentage)}%`}
            progress={round(course.progress_percentage)}
            actionName={i18n.t('sanarflix:global.viewCourse')}
            image={
                !!course.cover_pictures && course.cover_pictures.original.url
            }
            onClick={() => history.push(`/portal/curso/${course.id}`)}
            size='small'
        />
    </div>
)

const FLXViewedCourses = ({ history }: RouteComponentProps) => {
    const { t } = useTranslation('sanarflix')

    return (
        <SANQuery
            query={GET_COURSES_LAST_VIEWED}
            loaderProps={{ minHeight: 186, flex: true }}
            options={{ fetchPolicy: 'network-only' }}
        >
            {({ data }: { data: ICourses }) => {
                if (!data.courses.data.length) {
                    return null
                }
                return (
                    <>
                        <SANLayoutContainer>
                            <SANSessionTitle
                                title={t('home.viewedCourses.title')}
                                subtitle={t('home.viewedCourses.subtitle')}
                            />
                        </SANLayoutContainer>
                        <SANLayoutContainer mb={8} fullMobile>
                            <SANCarousel
                                slidesToShow={4}
                                slidesToScroll={1}
                                initialSlide={0}
                                arrows
                                infinite={false}
                                dots={false}
                                draggable
                                lazyLoad
                                swipeToSlide
                                responsive={responsive(
                                    data.courses.data.length
                                )}
                            >
                                {data.courses.data.map(renderCourse(history))}
                            </SANCarousel>
                        </SANLayoutContainer>
                    </>
                )
            }}
        </SANQuery>
    )
}

export default withRouter(FLXViewedCourses)
