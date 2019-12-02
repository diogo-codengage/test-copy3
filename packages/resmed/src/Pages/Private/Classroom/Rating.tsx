import React from 'react'

import { useApolloClient } from '@apollo/react-hooks'
import { withRouter, RouteComponentProps } from 'react-router-dom'

import {
    SANBox,
    SANClassroomHeader,
    SANLayoutContainer,
    SANLessonFeedback
} from '@sanar/components'

import { CREATE_RATING } from 'Apollo/Classroom/Mutations/create-rating'
import { useLayoutContext } from 'Pages/Private/Layout/Context'
import { useClassroomContext } from './Context'
import { useLayoutContext as useTrackContext } from 'Pages/Private/Context'

const RMClassroomRating = ({ history }: RouteComponentProps) => {
    const client = useApolloClient()
    const { params, onOpenMenu } = useLayoutContext()
    const { lesson } = useClassroomContext()
    const { handleTrack } = useTrackContext()

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
        } catch {}
        setSubmitting(false)
        handleNext()
    }

    const handleNext = () => history.push('./feedback')

    return (
        <SANBox flex='1'>
            <SANClassroomHeader
                title={lesson.title}
                subtitle={lesson.subSpecialty.specialty.name}
                onOpenMenu={onOpenMenu}
                actions={false}
            />
            <SANLayoutContainer
                pb='8'
                pt={{ lg: '8', _: '0' }}
                px={{ lg: 'md', _: '0' }}
            >
                <SANLessonFeedback onSend={handleRating} onNext={handleNext} />
            </SANLayoutContainer>
        </SANBox>
    )
}

export default withRouter(RMClassroomRating)
