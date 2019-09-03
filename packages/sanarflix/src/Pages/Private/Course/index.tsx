import React, { useState } from 'react'

import { useTranslation } from 'react-i18next'

import { withRouter, RouteComponentProps } from 'react-router-dom'

import {
    SANHeader,
    SANBox,
    SANLayoutContainer,
    SANTypography,
    SANCardInfo,
    SANCarousel,
    SANRow,
    SANCol,
    SANDivider,
    SANStyled,
    SANQuery
} from '@sanar/components'

import i18n from 'sanar-ui/dist/Config/i18n'

import articleSvg from 'Assets/images/course-items/article.svg'
import certifiedSvg from 'Assets/images/course-items/certified.svg'
import classSvg from 'Assets/images/course-items/class.svg'
import flowSvg from 'Assets/images/course-items/flow.svg'
import mentalMap from 'Assets/images/course-items/mental-map.svg'
import questionSvg from 'Assets/images/course-items/question.svg'
import resumeSvg from 'Assets/images/course-items/resume.svg'

import {
    GET_COURSE,
    ICourses,
    ICourseCounters
} from 'Apollo/Course/Queries/course'

import Themes from './Themes'
import FLXCourseNavigation from './Navigation'

const responsive = [
    {
        breakpoint: 1500,
        settings: {
            arrows: false,
            swipeToSlide: true
        }
    },
    {
        breakpoint: 650,
        settings: {
            slidesToShow: 3,
            arrows: false,
            swipeToSlide: true
        }
    },
    {
        breakpoint: 480,
        settings: {
            slidesToShow: 2,
            arrows: false,
            swipeToSlide: true
        }
    }
]

const resourceType = {
    Document: 'documento',
    Video: 'video',
    Question: 'questao'
}

const makeCardProps = ({ counters, image, item, ...props }) => ({
    text: i18n.t(`sanarflix:course.counters.${item}.key`, {
        count: counters[item]
    }),
    count: counters[item],
    image,
    ...props
})

const getCardProps = (counters: ICourseCounters) => {
    const items = Object.keys(counters).filter(key => !!counters[key])
    let cardsProps: any[] = []
    items.forEach(item => {
        switch (item) {
            case 'articles':
                cardsProps.push(
                    makeCardProps({ counters, image: articleSvg, item })
                )
                break
            case 'certificates':
                cardsProps.push(
                    makeCardProps({ counters, image: certifiedSvg, item })
                )
                break
            case 'flowcharts':
                cardsProps.push(
                    makeCardProps({ counters, image: flowSvg, item })
                )
                break
            case 'lessons':
                cardsProps.push(
                    makeCardProps({
                        counters,
                        image: classSvg,
                        item,
                        suffix: 'h'
                    })
                )
                break
            case 'mentalmaps':
                cardsProps.push(
                    makeCardProps({ counters, image: mentalMap, item })
                )
                break
            case 'questions':
                cardsProps.push(
                    makeCardProps({ counters, image: questionSvg, item })
                )
                break
            case 'resumes':
                cardsProps.push(
                    makeCardProps({ counters, image: resumeSvg, item })
                )
                break
            default: {
            }
        }
    })
    return cardsProps
}

const SANBoxStyled = SANStyled(SANBox)`
    @media screen and (min-width: 1500px) {
        width: calc(100% - 47px);
    }
`

const Cards = ({ counters }: { counters: ICourseCounters }) => {
    const items = getCardProps(counters)

    const renderItem = (item, index) => (
        <SANCardInfo key={index} {...item} limit={100} />
    )

    return (
        <SANBoxStyled mb={{ xs: 'xxl', sm: 0 }}>
            <SANCarousel
                slidesToShow={4}
                slidesToScroll={1}
                initialSlide={0}
                arrows
                infinite
                dots={false}
                draggable
                lazyLoad
                swipeToSlide
                responsive={responsive}
            >
                {items.map(renderItem)}
            </SANCarousel>
        </SANBoxStyled>
    )
}

const FLXCourse: React.FC<RouteComponentProps<{ id: string }>> = ({
    history,
    match: {
        params: { id }
    }
}) => {
    const { t } = useTranslation('sanarflix')
    const [showDescription, setShowDescription] = useState(false)

    return (
        <SANQuery
            query={GET_COURSE}
            options={{ variables: { id } }}
            loaderProps={{ minHeight: '100%', flex: true }}
        >
            {({ data }: { data: ICourses }) => {
                const course = data.courses.data[0]

                const redirectTo = current =>
                    history.push(
                        `/sala-aula/${course.id}/${
                            course[`${current}`].theme_id
                        }/${resourceType[course[`${current}`].resource_type]}/${
                            course[`${current}`].resource_id
                        }`
                    )

                return (
                    <SANBox displayFlex flexDirection='column' flex='1'>
                        <SANHeader
                            onBack={() => history.goBack()}
                            SessionTitleProps={{
                                title: course.name
                            }}
                        />
                        <FLXCourseNavigation
                            LastAccessedProps={{
                                ...(course &&
                                    course.lastAccessed && {
                                        title: course.lastAccessed.theme_title,
                                        image: course.lastAccessed.thumbnail,
                                        type: course.lastAccessed.type,
                                        resource_type:
                                            course.lastAccessed.resource_type,
                                        redirectTo: () =>
                                            redirectTo('lastAccessed')
                                    })
                            }}
                            SuggestedItemProps={{
                                ...(course &&
                                    course.lastAccessed && {
                                        title: course.lastAccessed.theme_title,
                                        image: course.lastAccessed.thumbnail,
                                        type: course.lastAccessed.type,
                                        resource_type:
                                            course.lastAccessed.resource_type,
                                        redirectTo: () =>
                                            redirectTo('lastAccessed')
                                    })
                            }}
                        />
                        <SANLayoutContainer
                            mt={8}
                            style={{ overflow: 'hidden' }}
                        >
                            <SANRow type='flex' align='middle' gutter={64}>
                                <SANCol xs={{ span: 24, order: 1 }} lg={8}>
                                    <SANBox mb='md'>
                                        <SANTypography level={5} mb='xs'>
                                            {t('course.whatCurseHave')}
                                        </SANTypography>
                                        {t('course.description')}
                                        {!!course.description && (
                                            <SANTypography
                                                variant='subtitle2'
                                                strong
                                                color='primary'
                                                component='span'
                                                ml='xs'
                                                onClick={() =>
                                                    setShowDescription(
                                                        old => !old
                                                    )
                                                }
                                            >
                                                {showDescription
                                                    ? t('course.seeLess')
                                                    : t('course.viewMore')}
                                            </SANTypography>
                                        )}
                                    </SANBox>
                                </SANCol>
                                <SANCol xs={{ span: 24, order: 3 }} lg={16}>
                                    <Cards counters={course.counters} />
                                </SANCol>
                                {showDescription && (
                                    <SANCol
                                        xs={{ span: 24, order: 2 }}
                                        sm={{ span: 24, order: 3 }}
                                    >
                                        <SANTypography
                                            variant='subtitle2'
                                            my='md'
                                        >
                                            {course.description}
                                        </SANTypography>
                                    </SANCol>
                                )}
                            </SANRow>
                            <SANDivider mt='md' />
                        </SANLayoutContainer>
                        <Themes courseId={course.id} />
                    </SANBox>
                )
            }}
        </SANQuery>
    )
}

export default withRouter(FLXCourse)
