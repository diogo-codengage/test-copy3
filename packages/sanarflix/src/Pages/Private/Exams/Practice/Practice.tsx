import React, { useEffect, useState, useCallback, useMemo } from 'react'

import { useHistory, useParams } from 'react-router'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useQuery } from '@apollo/react-hooks'

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

interface IExamsPracticeProps extends RouteComponentProps<{ id: string }> {}

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
    const history = useHistory()
    const params = useParams<{ id: string }>()

    const {
        answers,
        stopWatchRef,
        startTimer,
        pauseTimer,
        questions,
        setQuestions,
        questionIndex,
        dispatch
    } = useExamsPracticeContext()

    const [response, setResponse] = useState<IResponse>(initialResponse)

    const [isQuestionMapOpenned, setIsQuestionMapOpenned] = useState<boolean>(
        false
    )

    const onOpenQuestionMap = useCallback(
        () => setIsQuestionMapOpenned(true),
        []
    )
    const onCloseQuestionMap = useCallback(
        () => setIsQuestionMapOpenned(false),
        []
    )

    const { data, loading } = useQuery<IExamQuestionQuery>(GET_EXAM_QUESTIONS, {
        variables: {
            examIds: [params.id]
        }
    })

    useEffect(() => {
        if (data && data.questions && data.questions.data) {
            startTimer()
            setQuestions(data && data.questions && data.questions.data)
        }
    }, [data, setQuestions, startTimer])

    const getCorrectAnswer = useCallback(
        (_, index) => {
            if (index === 0) {
                return questions[questionIndex].alternatives.data[0]
            }
        },
        [questions, questionIndex]
    )

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
        const hasSkipped = answers.findIndex(item => item.skipped)

        if (answers.length === questions.length) {
            if (hasSkipped > -1) {
                dispatch({
                    type: 'NEXT',
                    payload: hasSkipped - 1
                })
            } else {
                history.push('/portal/provas/pratica/finalizada')
            }
        }

        dispatch({
            type: 'NEXT'
        })

        startTimer()

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
        },
        [questionIndex, dispatch]
    )

    const configuredQuestionMapItems = useMemo(() => {
        if (questions && answers.length) {
            return questions.map(item => {
                const answered = answers.find(
                    answer => answer.questionId === item.id
                )

                if (answered)
                    return {
                        status: answered.correct
                            ? 'correct'
                            : answered.correct === false
                            ? 'wrong'
                            : answered.skipped
                            ? 'skipped'
                            : null
                    }

                return {}
            })
        }

        return []
    }, [questions, answers])

    const onConfirm = useCallback(
        answerId => {
            pauseTimer()
            const correctAnswer = questions[
                questionIndex
            ].alternatives.data.find(getCorrectAnswer)

            const wasSkipped = answers.find(item => {
                return (
                    item.questionId === questions[questionIndex].id &&
                    item.skipped
                )
            })

            setResponse({
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

            const hasSkipped = answers.find(item => item.skipped)

            if (answers.length + 1 === questions.length && !hasSkipped)
                history.push('/portal/provas/pratica/finalizada')
        },
        [
            questions,
            questionIndex,
            answers,
            dispatch,
            getCorrectAnswer,
            history,
            pauseTimer
        ]
    )

    return (
        <>
            <SANHeader
                // onBack={() => history.push('/portal/inicio')}
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
                            Voltar
                        </SANButton>
                        <SANButton
                            disabled={loading || questionIndex === 20}
                            uppercase
                            bold
                            size='small'
                            variant='outlined'
                            onClick={onNextQuestion}
                        >
                            Próximo
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
                                onClick={onOpenQuestionMap}
                                mr='xl'
                            >
                                <SANEvaIcon name='map-outline' mr='xs' />
                                {t('exams.practice.questionMap')}
                            </SANButton>
                            <SANStopwatch ref={stopWatchRef} />
                            <SANButton
                                onClick={() =>
                                    history.push(
                                        '/portal/provas/pratica/finalizada'
                                    )
                                }
                                ml='xl'
                                uppercase
                                bold
                                size='small'
                                variant='outlined'
                            >
                                ENCERRAR PROVA
                            </SANButton>
                        </SANBox>
                    </SANBox>
                    <SANQuestion
                        question={questions && questions[questionIndex]}
                        onConfirm={onConfirm}
                        onJump={onSkipQuestion}
                        onPrevious={onPreviousQuestion}
                        onNext={onNextQuestion}
                        loading={loading}
                        {...response}
                    />
                </SANLayoutContainer>
            </SANBox>
            <SANExamsQuestionMap
                items={configuredQuestionMapItems}
                onCancel={onCloseQuestionMap}
                visible={isQuestionMapOpenned}
            />
        </>
    )
}

export default withRouter(FLXExamsPractice)
