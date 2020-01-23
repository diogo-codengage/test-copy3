import React, { useState, useMemo, useEffect } from 'react'

import { theme } from 'styled-tools'
import { useApolloClient } from '@apollo/react-hooks'
import { useTranslation } from 'react-i18next'
import { withRouter, RouteComponentProps } from 'react-router-dom'

import {
    SANRow,
    SANCol,
    SANBox,
    SANButton,
    SANTypography,
    SANQuestion,
    SANQuestionMap,
    SANStopwatch,
    SANEvaIcon,
    SANStyled
} from '@sanar/components'

import { ANSWER_MUTATION } from 'Apollo/Classroom/Mutations/answer'

import { events } from 'Config/Segment'

import { useClassroomQuizContext } from './Context'
import { useClassroomContext } from '../Context'

interface IParams {
    questionId: string
}

const SANColFloat = SANStyled(SANCol)`
    && {
        ${theme('mediaQueries.down.md')} {
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            padding: ${theme('space.sm')};
            box-shadow: 0 -1px 2px ${theme('colors.grey.4')};
            z-index: 1;
        }
    }
`

const FLXClassRoomQuizQuestion = ({
    history,
    match: {
        params: { questionId }
    }
}: RouteComponentProps<IParams>) => {
    const client = useApolloClient()
    const { t } = useTranslation('sanarflix')
    const {
        questions,
        setQuestions,
        stopwatchRef,
        setStats,
        questionsMap,
        setQuestionsMap,
        pauseStopwatch,
        startStopwatch
    } = useClassroomQuizContext()
    const { handleBookmark, handleProgress } = useClassroomContext()
    const [visible, setVisible] = useState(false)
    const [loading, setLoading] = useState(false)
    const [responses, setResponses] = useState<any[]>([])

    const courseId = window.location.hash.split('/')[3]

    const goToNext = () => {
        !!stopwatchRef.current &&
            setStats(old => ({ ...old, time: stopwatchRef.current.time() }))
        questions[index + 1]
            ? history.push(`./${questions[index + 1].id}`)
            : history.push('./finalizado')
        startStopwatch()
    }

    const handleJump = () => {
        setStats(oldStats => ({
            ...oldStats,
            skipped: oldStats.skipped + 1
        }))
        goToNext()
    }

    const handleNext = () => goToNext()

    const handleConfirm = async alternativeId => {
        pauseStopwatch()
        setLoading(true)
        handleProgress({
            resource: { id: window.location.hash.split('/')[6], type: 'Quiz' },
            percentage: parseInt(
                (((index + 1) * 100) / questions.length).toString()
            ),
            courseId
        })

        try {
            const {
                data: {
                    questionAnswer: {
                        answer: {
                            question: { comments, alternatives, id }
                        }
                    }
                }
            } = await client.mutate({
                mutation: ANSWER_MUTATION,
                variables: {
                    questionId: questions[index].id,
                    alternativeId
                }
            })

            const correct = alternatives.data.find(
                alternative => alternative.correct
            )
            if (correct.id === alternativeId) {
                setStats(oldStats => ({
                    ...oldStats,
                    correct: oldStats.correct + 1
                }))
            } else {
                setStats(oldStats => ({
                    ...oldStats,
                    wrong: oldStats.wrong + 1
                }))
            }

            setResponses(oldResponses => [
                ...oldResponses,
                {
                    comment:
                        comments.data && comments.data.length
                            ? comments.data[0]
                            : null,
                    answer: correct.id,
                    questionId: id
                }
            ])
            setQuestionsMap(oldMap =>
                oldMap.map(e => (e.id === id ? { ...e, status: true } : e))
            )
        } catch (e) {}
        setLoading(false)
    }

    const onBookmark = () => {
        try {
            const questionId = questions[index].id
            const bookmark = questions[index].bookmarked
            handleBookmark({
                resourceId: questionId,
                resourceType: 'Question',
                bookmark
            })
            setQuestions(old =>
                old.map(question =>
                    question.id === questions[index].id
                        ? { ...question, bookmarked: !bookmark }
                        : question
                )
            )
        } catch {}
    }

    const toggleVisible = () => setVisible(oldVisible => !oldVisible)

    const index = useMemo(
        () => questions.findIndex(question => question.id === questionId),
        [questionId, questions]
    )

    useEffect(() => {
        if (!!stopwatchRef && !!stopwatchRef.current) {
            stopwatchRef.current.start()
        }
    }, [stopwatchRef])

    useEffect(() => {
        window.analytics.page(
            events['Page Viewed'].event,
            events['Page Viewed'].data
        )
    }, [])

    return (
        <>
            <SANRow type='flex' align='middle' justifyContent='space-between'>
                <SANCol xs={24} sm={8}>
                    <SANBox
                        display='flex'
                        alignItems='center'
                        mb={{ sm: '0', _: 'md' }}
                    >
                        <SANTypography color='white.10' level={4} mr='xs'>
                            {t('classroom.quiz.question')} {index + 1}
                        </SANTypography>
                        <SANTypography color='white.5' vairnat='subtitle1'>
                            / {questions.length}
                        </SANTypography>
                    </SANBox>
                </SANCol>
                <SANColFloat md={8} bg='grey-solid.8'>
                    <SANBox
                        display='flex'
                        alignItems='center'
                        justifyContent='center'
                    >
                        <SANQuestionMap
                            items={questionsMap}
                            current={index}
                            mock
                            onCancel={toggleVisible}
                            visible={visible}
                        />
                        <SANButton
                            size='small'
                            variant='outlined'
                            color='light'
                            mr='xl'
                            onClick={toggleVisible}
                        >
                            <SANEvaIcon name='map-outline' mr='xs' />
                            {t('classroom.quiz.questionMap')}
                        </SANButton>
                        <SANStopwatch dark ref={stopwatchRef} />
                    </SANBox>
                </SANColFloat>
                <SANCol xs={24} sm={8}>
                    <SANBox
                        display='flex'
                        justifyContent={{ sm: 'flex-end', _: 'start' }}
                    >
                        <SANButton
                            variant='text'
                            color='white'
                            onClick={onBookmark}
                            bold
                        >
                            {questions[index] && questions[index].bookmarked ? (
                                <SANEvaIcon
                                    name='heart'
                                    key='bookmarked'
                                    color='secondary'
                                    fontSize='lg'
                                    mr='xs'
                                />
                            ) : (
                                <SANEvaIcon
                                    name='heart-outline'
                                    key='not-bookmarked'
                                    fontSize='lg'
                                    mr='xs'
                                />
                            )}
                            {t('classroom.quiz.bookmark')}
                        </SANButton>
                    </SANBox>
                </SANCol>
            </SANRow>

            <SANBox mt={{ sm: '8', _: 'sm' }}>
                <SANQuestion
                    question={questions[index]}
                    {...responses.find(
                        res => res.questionId === questions[index].id
                    )}
                    loading={loading}
                    onConfirm={handleConfirm}
                    onJump={handleJump}
                    onNext={handleNext}
                />
            </SANBox>
        </>
    )
}

export default withRouter(FLXClassRoomQuizQuestion)
