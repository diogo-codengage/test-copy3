import React, { memo, useCallback, useMemo } from 'react'

import { useTranslation } from 'react-i18next'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { format, isBefore, isAfter } from 'date-fns'
import { filter, path, sortBy } from 'ramda'

import {
    SANEvaIcon,
    SANBox,
    SANButton,
    SANTypography,
    SANScroll,
    SANChangeCourse,
    SANErrorBoundary,
    SANGenericError,
    SANSpin,
    useSnackbarContext
} from '@sanar/components'
import { getUTCDate } from '@sanar/utils/dist/Date'

import { useAuthContext } from 'Hooks/auth'
import { GET_COURSES, ICourseQuery } from 'Apollo/User/Queries/courses'
import { GET_ME } from 'Apollo/User/Queries/me'
import {
    UPDATE_ACTIVE_COURSE,
    IUpdateActiveCourseResponse,
    IUpdateActiveCourseVariables
} from 'Apollo/User/Mutations/update-active-course'
import { GET_ACTIVE_COURSE } from 'Apollo/User/Queries/active-course'

import { useLayoutContext } from '../Context'

const arr = new Array(3).fill(0).map((_, index) => index)
const formatExpireDate = (date: Date) => format(date, 'DD/MM/YYYY')

const Courses = withRouter(({ history }) => {
    const { activeCourse } = useAuthContext()
    const { loading, data } = useQuery<ICourseQuery>(GET_COURSES)
    const [changeCourse, { loading: loadingMutation }] = useMutation<
        IUpdateActiveCourseResponse,
        IUpdateActiveCourseVariables
    >(UPDATE_ACTIVE_COURSE, {
        onCompleted() {
            history.push('/inicio/curso')
        },
        refetchQueries: [{ query: GET_ME }, { query: GET_ACTIVE_COURSE }]
    })
    const { setMenuTab, onCloseMenu } = useLayoutContext()
    const handleChange = courseId => {
        changeCourse({ variables: { courseId } }).finally(() => {
            onCloseMenu()
            setMenuTab(0)
        })
    }

    const getProps = useCallback(
        course => {
            const start = getUTCDate(course.startDate)
            const end = getUTCDate(course.expireDate)
            return {
                key: course.id,
                id: course.id,
                title: course.name,
                date: formatExpireDate(
                    isAfter(start, new Date()) ? start : end
                ),
                percent: course.progress,
                coverPicture:
                    !!course.images && !!course.images.original
                        ? course.images.original
                        : '',
                expired: isBefore(end, new Date()),
                notStarted: isAfter(start, new Date()),
                onChange: () => handleChange(course.id)
            }
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [loading, data]
    )

    const renderCourse = course => (
        <SANChangeCourse
            BoxProps={{ mb: 'md' }}
            loading={loading}
            {...getProps(course)}
        />
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

    return (
        <SANSpin spinning={loadingMutation || loading}>
            {courses.map(renderCourse)}
        </SANSpin>
    )
})

const Error = props => (
    <SANErrorBoundary
        {...props}
        component={
            <SANGenericError
                TypographyProps={{
                    color: 'grey.5',
                    fontSize: 'sm'
                }}
            />
        }
    />
)

const RMMenuChangeCourse = memo<RouteComponentProps>(({ history }) => {
    const { t } = useTranslation('resmed')
    const createSnackbar = useSnackbarContext()
    const { activeCourse } = useAuthContext()
    const { setMenuTab, suggestedClass } = useLayoutContext()

    const goToClassroom = () => {
        try {
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
                    history.push(
                        `/inicio/sala-aula/${path}/quiz/${resource.id}/0`
                    )
                } else {
                    history.push(
                        `/inicio/sala-aula/${path}/video/${resource.id}`
                    )
                }
            }
        } catch (error) {
            console.error('[RMMenuChangeCourse]:goToClassroom', error)
            createSnackbar({
                message: t('mainMenu.changeCourse.errorGoClass'),
                theme: 'error'
            })
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
                <Error>
                    <SANChangeCourse
                        id={activeCourse.id}
                        title={activeCourse.name}
                        date={formatExpireDate(
                            getUTCDate(activeCourse.expireDate)
                        )}
                        percent={activeCourse.progress}
                        coverPicture={
                            !!activeCourse.images &&
                            !!activeCourse.images.original
                                ? activeCourse.images.original
                                : ''
                        }
                        hasActive
                        ContinueProps={
                            !!suggestedClass.data
                                ? {
                                      onClick: goToClassroom,
                                      title: t(
                                          'mainMenu.changeCourse.suggestedClass'
                                      ),
                                      subtitle: suggestedClass.data!.title,
                                      loading: suggestedClass.loading
                                  }
                                : undefined
                        }
                    />
                </Error>
            )}

            <SANBox px='md'>
                <SANTypography fontSize='xl' color='grey.7' my='md'>
                    {t('mainMenu.changeCourse.subtitle')}
                </SANTypography>
                <Error>
                    <Courses />
                </Error>
            </SANBox>
        </SANScroll>
    )
})

export default withRouter(RMMenuChangeCourse)
