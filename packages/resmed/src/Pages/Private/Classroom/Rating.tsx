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

const RMClassroomRating = ({ history }: RouteComponentProps) => {
    const client = useApolloClient()
    const { params, onOpenMenu } = useLayoutContext()

    const handleRating = async (value, { setSubmitting }) => {
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
                title={'quiz.title'}
                subtitle={'uiz.specialty.name'}
                onOpenMenu={onOpenMenu}
            />
            <SANLayoutContainer py='8'>
                <SANLessonFeedback onSend={handleRating} onNext={handleNext} />
            </SANLayoutContainer>
        </SANBox>
    )
}

export default withRouter(RMClassroomRating)
