import React, { memo, useCallback, useMemo } from 'react'

import { useTranslation } from 'react-i18next'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { format } from 'date-fns'
import { filter, path, sortBy } from 'ramda'

import {
    SANEvaIcon,
    SANBox,
    SANButton,
    SANTypography,
    SANScroll,
    SANChangeCourse,
    SANErrorBoundary,
    SANGenericError
} from '@sanar/components'

import { useAuthContext } from 'Hooks/auth'
import { GET_COURSES, ICourseQuery } from 'Apollo/User/Queries/courses'
import {
    UPDATE_ACTIVE_COURSE,
    IUpdateActiveCourseResponse,
    IUpdateActiveCourseVariables
} from 'Apollo/User/Mutations/update-active-course'

import { useLayoutContext } from '../Context'

const arr = new Array(3).fill(0).map((_, index) => index)
const formatExpireDate = (date: string) => format(new Date(date), 'DD/MM/YYYY')

const Courses = withRouter(({ history }) => {
    const { setActiveCourse, activeCourse } = useAuthContext()
    const { loading, data } = useQuery<ICourseQuery>(GET_COURSES)
    const [changeCourse] = useMutation<
        IUpdateActiveCourseResponse,
        IUpdateActiveCourseVariables
    >(UPDATE_ACTIVE_COURSE, {
        onCompleted({ updateActiveCourse }) {
            setActiveCourse(updateActiveCourse)
            history.push('/inicio/curso')
        }
    })
    const { setMenuTab, onCloseMenu } = useLayoutContext()

    const handleChange = courseId => {
        changeCourse({ variables: { courseId } })
        onCloseMenu()
        setMenuTab(0)
    }

    const getProps = useCallback(
        course =>
            !loading && !!course
                ? {
                      key: course.id,
                      id: course.id,
                      title: course.name,
                      date: formatExpireDate(course.expireDate),
                      percent: course.progress,
                      coverPicture: course.images.original,
                      onChange: () => handleChange(course.id)
                  }
                : {},
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [loading, data]
    )

    const renderCourse = course => (
        <SANChangeCourse mb='md' loading={loading} {...getProps(course)} />
    )

    const courses = useMemo(() => {
        if (!!data && !!data.courses) {
            const filtered = filter(
                e => e.id !== activeCourse.id,
                data!.courses
            )
            return sortBy(path(['name']))(filtered)
        } else {
            return arr
        }
    }, [activeCourse, data])

    return <>{courses.map(renderCourse)}</>
})

const RMMenuChangeCourse = memo<RouteComponentProps>(({ history }) => {
    const { t } = useTranslation('resmed')
    const { activeCourse } = useAuthContext()
    const { setMenuTab, suggestedClass } = useLayoutContext()

    const goToClassroom = () => {
        if (!!suggestedClass.data) {
            const {
                accessContent: {
                    specialtyId,
                    subSpecialtyId,
                    resource,
                    collectionId,
                    lesson
                }
            } = suggestedClass.data
            const type = resource.type.toLocaleLowerCase()
            const path = subSpecialtyId
                ? `${specialtyId}/${subSpecialtyId}/${lesson.id}/${collectionId}`
                : `${specialtyId}/${lesson.id}/${collectionId}`
            if (type === 'quiz') {
                history.push(`/inicio/sala-aula/${path}/quiz/${resource.id}/0`)
            } else {
                history.push(`/inicio/sala-aula/${path}/video/${resource.id}`)
            }
        }
    }

    return (
        <SANScroll>
            <SANBox px='md'>
                <SANButton
                    mb='md'
                    size='xsmall'
                    variant='outlined'
                    color='grey'
                    block
                    bold
                    onClick={() => setMenuTab(0)}
                >
                    <SANEvaIcon name='arrow-back-outline' mr='xs' />
                    {t('mainMenu.back')}
                </SANButton>
            </SANBox>
            {!!activeCourse && (
                <SANChangeCourse
                    id={activeCourse.id}
                    title={activeCourse.name}
                    date={formatExpireDate(activeCourse.expireDate)}
                    percent={activeCourse.progress}
                    coverPicture={activeCourse.images.original}
                    ContinueProps={{
                        onClick: goToClassroom,
                        title: t('mainMenu.changeCourse.continue', {
                            index: suggestedClass.data!.accessContent.lesson
                                .index
                        }),
                        subtitle: suggestedClass.data!.title,
                        loading: suggestedClass.loading
                    }}
                />
            )}

            <SANBox px='md'>
                <SANTypography fontSize='xl' color='grey.7' my='md'>
                    {t('mainMenu.changeCourse.subtitle')}
                </SANTypography>
                <SANErrorBoundary
                    component={
                        <SANGenericError
                            TypographyProps={{
                                color: 'grey.5',
                                fontSize: 'sm'
                            }}
                        />
                    }
                >
                    <Courses />
                </SANErrorBoundary>
            </SANBox>
        </SANScroll>
    )
})

export default withRouter(RMMenuChangeCourse)
