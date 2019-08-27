import React from 'react'

import { useTranslation } from 'react-i18next'
import { theme } from 'styled-tools'
import { withRouter, RouteComponentProps } from 'react-router-dom'

import {
    SANLayoutContainer,
    SANCardCourseModule,
    SANInfiniteScroll,
    SANSessionTitle,
    SANRow,
    SANCol,
    SANBox,
    SANEmpty,
    SANStyled,
    SANQuery
} from '@sanar/components'

import i18n from 'sanar-ui/dist/Config/i18n'

import { GET_COURSES, ICourses, ICourse } from 'Apollo/Courses/Queries/courses'

import { FLXCompletenessFilters } from 'Components/CompletenessFilters'
import { useCoursesContext } from './Context'

const SANSessionTitleStyled = SANStyled(SANSessionTitle)`
    & > div:nth-child(1) {
        margin-right: 90px;
    }
    & > div:nth-child(2) {
        display: block;
        flex: inherit;
        margin: 0;

        ${theme('mediaQueries.down.xs')} {
            margin-top: ${theme('space.md')};
        }
    }
`

const renderCourse = history => (course: ICourse) => (
    <SANCol key={course.id} xs={12} lg={8} xl={6}>
        <SANCardCourseModule
            mb='xl'
            image={course.cover_picture_url}
            title={course.name}
            progress={70}
            badge={'70%'}
            actionName={i18n.t('sanarflix:courses.viewCourse')}
            onClick={() => history.push(`/portal/curso/${course.id}`)}
        />
    </SANCol>
)

const updateCacheCourses = (prev, { fetchMoreResult }) => {
    if (!fetchMoreResult) return prev
    return Object.assign({}, prev, {
        courses: {
            ...prev.courses,
            data: [...prev.courses.data, ...fetchMoreResult.courses.data]
        }
    })
}

const FLXCoursesList: React.FC<RouteComponentProps & { id?: string }> = ({
    id,
    history
}) => {
    const { t } = useTranslation('sanarflix')
    const {
        completenessFilter,
        onChangeCompletenessFilters
    } = useCoursesContext()

    return (
        <SANBox bg='grey-solid.1' flex='1' height='100%'>
            <SANQuery
                query={GET_COURSES}
                options={{
                    variables: {
                        tagId: id,
                        ...(completenessFilter !== 'all' && {
                            completeness: completenessFilter
                        })
                    }
                }}
                loaderProps={{ flex: true, minHeight: 200 }}
            >
                {({
                    data: { courses },
                    fetchMore
                }: {
                    data: ICourses
                    fetchMore: (data: any) => Object
                }) => (
                    <>
                        <SANLayoutContainer pt={8} pb={7}>
                            <SANSessionTitleStyled
                                title={t('courses.subheader.keyWithCount', {
                                    count: courses.count
                                })}
                                extra={
                                    <FLXCompletenessFilters
                                        defaultValue='all'
                                        value={completenessFilter}
                                        onChange={onChangeCompletenessFilters}
                                    />
                                }
                                extraOnLeft
                                m='0'
                            />
                        </SANLayoutContainer>
                        <SANLayoutContainer pb={7}>
                            {!!courses.data.length ? (
                                <SANInfiniteScroll
                                    threshold={204}
                                    loadMore={() =>
                                        fetchMore({
                                            variables: {
                                                offset: courses.data.length
                                            },
                                            updateQuery: updateCacheCourses
                                        })
                                    }
                                    hasMore={
                                        courses.data.length < courses.count
                                    }
                                >
                                    <SANRow gutter={24}>
                                        {courses.data.map(
                                            renderCourse(history)
                                        )}
                                    </SANRow>
                                </SANInfiniteScroll>
                            ) : (
                                <SANEmpty />
                            )}
                        </SANLayoutContainer>
                    </>
                )}
            </SANQuery>
        </SANBox>
    )
}

export default withRouter(FLXCoursesList)
