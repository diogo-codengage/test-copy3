import React, { memo, useEffect, useState } from 'react'

import { useApolloClient } from '@apollo/react-hooks'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import * as Sentry from '@sentry/browser'

import {
    SANBox,
    SANClassroomHeader,
    SANLayoutContainer,
    SANLessonFeedback
} from '@sanar/components'

import { CREATE_RATING } from 'Apollo/Classroom/Mutations/create-rating'
import { useLayoutContext } from 'Pages/Private/Layout/Context'
import { useMainContext } from 'Pages/Private/Context'

import { useClassroomContext } from './Context'
import { IParams } from './'

const RMClassroomRating = memo<RouteComponentProps<IParams>>(
    ({ history, match: { params: paramsProp } }) => {
        const client = useApolloClient()
        const [onCompleted, setCompleted] = useState(false)
        const { params, onOpenMenu, setParams } = useLayoutContext()
        const { handleTrack } = useMainContext()
        const { lesson, specialty, hasQuestions } = useClassroomContext()

        const handleRating = async (value, { setSubmitting }) => {
            handleTrack('Video rated', {
                'Specialty ID': params.specialtyId,
                'Subspecialty ID': params.subspecialtyId,
                'Lesson ID': params.lessonId,
                'Clicker ID': params.collectionId,
                Rating: value
            })
            try {
                await client.mutate({
                    mutation: CREATE_RATING,
                    variables: {
                        lessonId: params.lessonId,
                        value
                    }
                })
            } catch (error) {
                Sentry.captureException(error)
            } finally {
                setCompleted(true)
                setSubmitting(false)
                handleNext()
            }
        }

        const handleNext = () => {
            if (hasQuestions) {
                history.push('./feedback')
            } else {
                setCompleted(true)
            }
        }

        useEffect(() => {
            setParams(old => ({ ...old, ...paramsProp }))
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [])

        return (
            <SANBox flex='1'>
                <SANClassroomHeader
                    title={lesson.title}
                    subtitle={specialty.title}
                    onOpenMenu={onOpenMenu}
                    actions={false}
                    plataform='resmed'
                />
                <SANLayoutContainer
                    pb='8'
                    pt={{ lg: '8', _: '0' }}
                    px={{ lg: 'md', _: '0' }}
                >
                    <SANLessonFeedback
                        onSend={handleRating}
                        onNext={handleNext}
                        hasCallback={onCompleted && !hasQuestions}
                    />
                </SANLayoutContainer>
            </SANBox>
        )
    }
)

export default withRouter(RMClassroomRating)
