import React, { useEffect, useState, useCallback } from 'react'

import { useHistory, useParams } from 'react-router'
import { withRouter } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useQuery, useMutation } from '@apollo/react-hooks'

import {
    SANBox,
    SANLayoutContainer,
    SANStopwatch,
    SANTypography,
    SANExamsQuestionMap,
    SANEvaIcon,
    SANButton,
    SANQuestion,
    SANHeader
} from '@sanar/components'
import {
    GET_EXAM_QUESTIONS,
    IExamQuestionQuery
} from 'Apollo/Exams/Queries/get-questions-from-exam'

import { useExamsPracticeContext } from './Context'
import { ANSWER_MUTATION } from 'Apollo/Classroom/Mutations/answer'
import { useAuthContext } from '../../../../Hooks/auth'

interface IResponse {
    comment?: any //TODO: ADD TYPE
    answer?: string | null
    questionId?: string | null
    defaultSelected?: string | null
    isHistoric?: boolean
}

const initialResponse: IResponse = {
    comment: null,
    answer: null,
    questionId: null,
    isHistoric: false,
    defaultSelected: null
}

const FLXExamsPractice = () => {
    const { t } = useTranslation('sanarflix')
    const { me } = useAuthContext()
    const history = useHistory()
    const params = useParams<{ id: string }>()
    const { id: userId, email } = me

    const trackQuestion = (eventName, questionId?) => {
        const data = {
            userId,
            email,
            examId: params.id
        }
        if (questionId) data['questionId'] = questionId
        window.analytics.track(eventName, data)
    }

    const {
        answers,
        stopWatchRef,
        startTimer,
        pauseTimer,
        questions,
        setQuestions,
        questionIndex,
        dispatch,
        configuredQuestionMapItems
    } = useExamsPracticeContext()

    const [response, setResponse] = useState<IResponse>(initialResponse)

    const [isQuestionMapOpenned, setIsQuestionMapOpenned] = useState<boolean>(
        false
    )

    const { data, loading } = useQuery<IExamQuestionQuery>(GET_EXAM_QUESTIONS, {
        variables: {
            quizId: params.id
        }
    })

    const [answer, { loading: loadingAnswer }] = useMutation(ANSWER_MUTATION)

    useEffect(() => {
        if (data && data.questions && data.questions.data) {
            startTimer()
            setQuestions(data && data.questions && data.questions.data)
        }
    }, [data, setQuestions, startTimer])

    const configureResponse = useCallback(
        ({ goPrevious = false }) => {
            const index = goPrevious ? -1 : 1

            const onNextQuestion = answers.find(item => {
                return item.index === questionIndex + index
            })

            onNextQuestion && !onNextQuestion.skipped
                ? setResponse({
                      answer: onNextQuestion.answer,
                      questionId: onNextQuestion.questionId,
                      defaultSelected: onNextQuestion.defaultSelected,
                      isHistoric: true
                  })
                : setResponse(initialResponse)
        },
        [answers, questionIndex]
    )

    const onNextQuestion = () => {
        startTimer()
        window.scrollTo({ top: 0, behavior: 'smooth' })

        if (answers.length === questions.length) {
            if (answers.findIndex(item => item.skipped) > -1) {
                dispatch({
                    type: 'NEXT',
                    payload: answers.findIndex(item => item.skipped)
                })
            } else {
                history.push('/portal/provas/pratica/finalizada')
            }
        }

        dispatch({
            type: 'NEXT'
        })

        configureResponse({})
    }

    const onPreviousQuestion = () => {
        dispatch({
            type: 'PREVIOUS'
        })
        configureResponse({ goPrevious: true })
    }

    const onSkipQuestion = useCallback(
        question => {
            dispatch({
                type: 'SKIP',
                payload: {
                    questionId: question.id,
                    index: questionIndex,
                    skipped: true
                }
            })
            trackQuestion('SkipQuestion', question.id)
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [questionIndex, dispatch]
    )

    const onConfirm = useCallback(
        async answerId => {
            pauseTimer()

            const {
                data: {
                    questionAnswer: {
                        answer: {
                            question: { comments, alternatives }
                        }
                    }
                }
            }: any = await answer({
                variables: {
                    questionId: questions[questionIndex]['id'],
                    alternativeId: answerId
                }
            })

            const correctAnswer = alternatives.data.find(
                alternative => alternative.correct
            )

            const wasSkipped = answers.find(item => {
                return (
                    item.questionId === questions[questionIndex].id &&
                    item.skipped
                )
            })

            setResponse({
                comment:
                    comments.data && comments.data.length
                        ? comments.data[0]
                        : null,
                answer: correctAnswer!!.id,
                questionId: questions[questionIndex].id,
                defaultSelected: answerId
            })

            dispatch({
                type: 'CONFIRM_QUESTION',
                payload: {
                    defaultSelected: answerId,
                    answer: correctAnswer!!.id,
                    questionId: questions[questionIndex].id,
                    index: questionIndex,
                    correct: answerId === correctAnswer!!.id,
                    skipped: !!wasSkipped
                }
            })

            trackQuestion('ConfirmQuestion', questions[questionIndex].id)

            if (
                answers.length + 1 === questions.length &&
                !answers.find(item => item.skipped)
            ) {
                trackQuestion('ExamFinished')
                history.push('/portal/provas/pratica/finalizada')
            }
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [
            questions,
            questionIndex,
            answers,
            dispatch,
            history,
            pauseTimer,
            answer
        ]
    )

    return (
        <>
            <SANHeader
                onBack={() => history.push('/portal/provas')}
                SessionTitleProps={{
                    title: t('exams.practice.title'),
                    subtitle: t('exams.practice.subtitle')
                }}
                extra={
                    <SANBox displayFlex justifyContent='flex-end'>
                        <SANButton
                            disabled={loading || questionIndex === 0}
                            mr='xl'
                            uppercase
                            bold
                            size='small'
                            variant='outlined'
                            onClick={onPreviousQuestion}
                        >
                            <SANEvaIcon name='arrow-back-outline' mr='xs' />
                            {t('exams.practice.previous')}
                        </SANButton>
                        <SANButton
                            disabled={loading || questionIndex === 20}
                            uppercase
                            bold
                            size='small'
                            variant='outlined'
                            onClick={onNextQuestion}
                        >
                            {t('exams.practice.next')}
                            <SANEvaIcon name='arrow-forward-outline' ml='xs' />
                        </SANButton>
                    </SANBox>
                }
            />
            <SANBox
                displayFlex
                flexDirection='column'
                flex='1'
                backgroundColor='grey-solid.1'
            >
                <SANLayoutContainer pt={8} pb={7}>
                    <SANBox
                        display='flex'
                        alignItems='center'
                        justifyContent='space-between'
                        mb='xl'
                    >
                        <SANBox display='flex' alignItems='center'>
                            <SANTypography level={4} mr='xs'>
                                {`Questão ${questionIndex + 1}`}
                            </SANTypography>
                            <SANTypography variant='body1' color='grey.5'>
                                /{' '}
                                {data && data.questions && data.questions.count}
                            </SANTypography>
                        </SANBox>
                        <SANBox displayFlex>
                            <SANButton
                                size='small'
                                variant='outlined'
                                onClick={() => setIsQuestionMapOpenned(true)}
                                mr='xl'
                            >
                                <SANEvaIcon name='map-outline' mr='xs' />
                                {t('exams.practice.questionMap')}
                            </SANButton>
                            <SANStopwatch ref={stopWatchRef} />
                            <SANButton
                                onClick={() => {
                                    trackQuestion('ExamFinished')
                                    history.push(
                                        '/portal/provas/pratica/finalizada'
                                    )
                                }}
                                ml='xl'
                                uppercase
                                bold
                                size='small'
                                variant='outlined'
                            >
                                {t('exams.practice.endExam')}
                            </SANButton>
                        </SANBox>
                    </SANBox>
                    <SANQuestion
                        question={questions && questions[questionIndex]}
                        onConfirm={onConfirm}
                        onJump={onSkipQuestion}
                        onPrevious={onPreviousQuestion}
                        onNext={onNextQuestion}
                        loading={loading || loadingAnswer}
                        {...response}
                    />
                </SANLayoutContainer>
            </SANBox>
            <SANExamsQuestionMap
                items={configuredQuestionMapItems}
                onCancel={() => setIsQuestionMapOpenned(false)}
                visible={isQuestionMapOpenned}
            />
        </>
    )
}

export default withRouter(FLXExamsPractice)
