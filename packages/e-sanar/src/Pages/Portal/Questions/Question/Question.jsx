import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

import { Mutation } from 'react-apollo'
import { useTranslation } from 'react-i18next'

import ESQuestion from 'sanar-ui/dist/Components/Molecules/Question'
import ESEvaIcon from 'sanar-ui/dist/Components/Atoms/EvaIcon'
import ESButton from 'sanar-ui/dist/Components/Atoms/Button'
import useWindowSize from 'sanar-ui/dist/Hooks/useWindowSize'

import { GET_QUESTIONS } from 'Apollo/Questions/queries/questions'
import { ANSWER_MUTATION } from 'Apollo/Questions/mutations/answer'

import { SANPortalPagesContainer } from 'Pages/Portal/Layout'

import SANSubheader from './Subheader'
import { useQuestionsContext } from '../Context'
import { useAuthContext } from 'Hooks/auth'
import { useApolloContext } from 'Hooks/apollo'

const SANQuestionPage = ({ history }) => {
    const {
        filter,
        setSkippedQuestions,
        setWrongQuestions,
        setCorrectQuestions,
        stopwatchRef,
        setTotalQuestions,
        setCurrentIndex,
        currentIndex
    } = useQuestionsContext()

    const { t } = useTranslation('esanar')
    const { width } = useWindowSize()
    const client = useApolloContext()
    const [isFull, setIsFull] = useState(width <= 992)
    const [questions, setQuestions] = useState([])
    const [response, setResponse] = useState({
        answer: null,
        stats: null,
        comment: null
    })
    const [firstLoad, setFirstLoad] = useState(false)
    const [limit] = useState(20)

    const { me, getEnrollment } = useAuthContext()
    const { course } = getEnrollment()

    const handleConfirm = mutation => alternative => {
        pauseStopwatch()
        mutation({
            variables: {
                userId: me.id,
                alternativeIds: [alternative],
                questionId: questions[0].id
            }
        })
    }

    const handleJump = () => {
        setSkippedQuestions(oldSkipped => ++oldSkipped)
        handleNext(null, true)
    }

    const handleNext = (isCorrect, isJump) => {
        setCurrentIndex(oldIndex => ++oldIndex)
        setQuestions(questions.slice(1))
        startStopwatch()

        if (currentIndex === limit - 5) {
            fetchQuestions()
        } else if (currentIndex === questions.length) {
            fetchQuestions(true)
            setResponse()
        } else {
            setResponse()
        }

        if (!isJump) {
            isCorrect
                ? setCorrectQuestions(oldCorrect => ++oldCorrect)
                : setWrongQuestions(oldWrong => ++oldWrong)
        }
    }

    const callbackAnswer = ({
        questionAnswer: {
            answer: {
                question: { comments, alternatives }
            },
            stats
        }
    }) => {
        if (alternatives && alternatives.data && alternatives.data.length) {
            const correct = alternatives.data.find(
                alternative => alternative.correct
            )

            setResponse({
                stats: stats.alternatives,
                comment:
                    comments.data && comments.data.length
                        ? comments.data[0]
                        : null,
                answer: correct.id
            })
        } else {
            setResponse({
                stats: stats.alternatives,
                comment:
                    comments.data && comments.data.length && comments.data[0]
            })
        }
    }

    const fetchQuestions = async load => {
        load && setFirstLoad(true)
        const {
            data: {
                questions: { data }
            }
        } = await client.query({
            query: GET_QUESTIONS,
            fetchPolicy: 'network-only',
            variables: {
                ...filter,
                courseIds: [course.id],
                limit
            }
        })

        const newQuestions = [...questions, ...data]
        setTotalQuestions(oldTotal => oldTotal + data.length)
        setQuestions(newQuestions)
        setFirstLoad(false)
    }

    const pauseStopwatch = () => {
        if (stopwatchRef && stopwatchRef.current) {
            stopwatchRef.current.pause()
        }
    }

    const startStopwatch = () => {
        if (stopwatchRef && stopwatchRef.current) {
            stopwatchRef.current.start()
        }
    }

    const seeFilter = () => {
        history.push('/aluno/banco-questoes/perguntas/filtro')
        pauseStopwatch()
    }

    useEffect(() => {
        if (stopwatchRef && stopwatchRef.current) {
            stopwatchRef.current.start()
        }
    }, [stopwatchRef])

    useEffect(() => {
        fetchQuestions(true)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filter])

    useEffect(() => {
        setIsFull(width <= 992)
    }, [width])

    return (
        <Mutation mutation={ANSWER_MUTATION} onCompleted={callbackAnswer}>
            {(
                answerQuestion,
                { loading: loadingMutation, error: errorMutation }
            ) => {
                if (errorMutation) return `Error! ${errorMutation}`
                return (
                    <>
                        <SANPortalPagesContainer>
                            <SANSubheader>
                                <div className='questions-question__subheader--actions'>
                                    <ESButton
                                        size='small'
                                        variant='text'
                                        bold
                                        disabled
                                    >
                                        <ESEvaIcon name='heart-outline' />
                                        {t(
                                            'questionBase.question.saveQuestion'
                                        )}
                                    </ESButton>
                                    <ESButton
                                        size='small'
                                        variant='text'
                                        bold
                                        onClick={seeFilter}
                                        className='pl-sm pr-sm'
                                    >
                                        <ESEvaIcon name='options-2-outline' />
                                        {t('questionBase.question.seeFilters')}
                                    </ESButton>
                                    <ESButton
                                        size='small'
                                        variant='text'
                                        circle
                                    >
                                        <ESEvaIcon name='more-vertical-outline' />
                                    </ESButton>
                                </div>
                            </SANSubheader>
                        </SANPortalPagesContainer>
                        <SANPortalPagesContainer>
                            <ESQuestion
                                full={isFull}
                                question={questions[0]}
                                onConfirm={handleConfirm(answerQuestion)}
                                onJump={handleJump}
                                onNext={handleNext}
                                loading={firstLoad || loadingMutation}
                                {...response}
                            />
                        </SANPortalPagesContainer>
                    </>
                )
            }}
        </Mutation>
    )
}

SANQuestionPage.propTypes = {
    question: PropTypes.any
}

export default SANQuestionPage
