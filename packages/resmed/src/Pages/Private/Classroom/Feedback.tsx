import React, { useEffect, useState } from 'react'

import { useApolloClient } from '@apollo/react-hooks'
import { withRouter, RouteComponentProps } from 'react-router-dom'

import {
    SANBox,
    SANClassroomHeader,
    SANLayoutContainer,
    SANLessonResult
} from '@sanar/components'

import {
    GET_LESSON_PERFORMANCE,
    IlessonPerformanceQuery
} from 'Apollo/Classroom/Queries/lessons-performance'
import { useLayoutContext } from 'Pages/Private/Layout/Context'

const RMClassroomFeedback = ({ history }: RouteComponentProps) => {
    const client = useApolloClient()
    const { params, onOpenMenu } = useLayoutContext()
    const [loading, setLoading] = useState(true)
    const [questions, setQuestions] = useState<any>([])

    useEffect(() => {
        const fetchResult = async () => {
            try {
                const {
                    data: { lessonPerformance }
                } = await client.query<IlessonPerformanceQuery>({
                    query: GET_LESSON_PERFORMANCE,
                    variables: {
                        lessonId: params.lessonId
                    }
                })
                setQuestions(lessonPerformance.items)
            } catch {}
            setLoading(false)
        }
        fetchResult()
    }, [])

    const handleGoPractice = () => history.push('/inicio/area-pratica')

    return (
        <SANBox flex='1'>
            <SANClassroomHeader
                title={'quiz.title'}
                subtitle={'uiz.specialty.name'}
                onOpenMenu={onOpenMenu}
            />
            <SANLayoutContainer py='8'>
                <SANLessonResult
                    onGoPractice={handleGoPractice}
                    questions={questions}
                    loading={loading}
                />
            </SANLayoutContainer>
        </SANBox>
    )
}

export default withRouter(RMClassroomFeedback)
