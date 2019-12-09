import React, { useEffect, useState } from 'react'

import { useApolloClient } from '@apollo/react-hooks'
import { withRouter, RouteComponentProps } from 'react-router-dom'

import {
    SANBox,
    SANClassroomHeader,
    SANLayoutContainer,
    SANLessonResult
} from '@sanar/components'
import { useWindowSize } from '@sanar/utils/dist/Hooks'

import {
    GET_LESSON_PERFORMANCE,
    IlessonPerformanceQuery
} from 'Apollo/Classroom/Queries/lessons-performance'
import RMCollection from 'Components/Collection'
import { useLayoutContext } from 'Pages/Private/Layout/Context'
import { useClassroomContext } from './Context'

const RMClassroomFeedback = ({ history }: RouteComponentProps) => {
    const client = useApolloClient()
    const { width } = useWindowSize()
    const { params, onOpenMenu } = useLayoutContext()
    const [loading, setLoading] = useState(true)
    const [questions, setQuestions] = useState<any>([])
    const { lesson, specialty } = useClassroomContext()

    const onChangeCollection = collection =>
        history.push(`./${collection.id}/video/${collection.content.video.id}`)

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
                setQuestions(lessonPerformance)
            } catch {}
            setLoading(false)
        }
        !!params.lessonId && fetchResult()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [params.lessonId])

    const handleGoPractice = () => history.push('/inicio/area-pratica/filtro')

    const handleGoQuiz = collection => {
        const {
            id,
            quiz: { questions, id: quizId }
        } = collection
        history.push(`./${id}/quiz/${quizId}/${questions[0].id}`)
    }

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
                <SANLessonResult
                    onGoPractice={handleGoPractice}
                    onGoQuiz={handleGoQuiz}
                    questions={questions}
                    loading={loading}
                />

                <SANBox mt={{ lg: 'xl', _: '0' }} px={width > 884 && 18}>
                    <RMCollection
                        parentId={params.lessonId}
                        value={params.collectionId}
                        vertical={false}
                        onChange={onChangeCollection}
                    />
                </SANBox>
            </SANLayoutContainer>
        </SANBox>
    )
}

export default withRouter(RMClassroomFeedback)
