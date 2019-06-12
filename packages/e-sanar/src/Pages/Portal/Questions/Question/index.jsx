import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

import { Query, Mutation } from 'react-apollo'

import { ESQuestion } from 'sanar-ui/dist/Components/Molecules/Question'
import ESCircleProgress from 'sanar-ui/dist/Components/Atoms/CircleProgress'
import ESEvaIcon from 'sanar-ui/dist/Components/Atoms/EvaIcon'
import ESTypography from 'sanar-ui/dist/Components/Atoms/Typography'
import ESButton from 'sanar-ui/dist/Components/Atoms/Button'

import { GET_QUESTIONS } from 'Apollo/Questions/queries/questions'
import { ANSWER_MUTATION } from 'Apollo/Questions/mutations/answer'

import { SANPortalPagesContainer } from 'Pages/Portal/Layout'

import SANQuestionHeader from './Header'
import { useAuthContext } from 'Hooks/auth'
import { useApolloContext } from 'Hooks/apollo'

const Indicator = ({ text, percent, status }) => (
    <div className='d-flex align-items-center mr-xl'>
        <ESTypography
            variant='body2'
            className='mr-md'
        >{`${text}:`}</ESTypography>
        <ESCircleProgress
            percent={percent}
            showInfo={true}
            status={status}
            strokeLinecap='square'
            width={44}
            strokeWidth={6}
        />
    </div>
)

const SANQuestionDetailsPage = ({ location: { state = {} } }) => {
    const { year, tagIds, levelIds, boardIds, examIds } = state

    const client = useApolloContext()
    const [questions, setQuestions] = useState([])
    const [index, setIndex] = useState(0)
    const [currentQuestion, setCurrentQuestion] = useState()
    const [answer, setAnswer] = useState()
    const [stats, setStats] = useState()
    const [firstLoad, setFirstLoad] = useState(false)
    const [limit] = useState(20)

    const { me, getEnrollment } = useAuthContext()
    const { course } = getEnrollment()

    const handleConfirm = mutation => alternative => {
        mutation({
            variables: {
                userId: me.id,
                alternativeIds: [alternative],
                questionId: currentQuestion.id
            }
        })
    }

    const handleJump = () => handleNext()

    const handleNext = () => {
        console.log('index', index)
        if (index === limit - 5) {
            console.log('1')
            setQuestions(questions.slice(limit - 5))
            fetchQuestions()
        } else if (index === questions.length - 1) {
            setFirstLoad(true)
            setCurrentQuestion(null)
            fetchQuestions()
        } else {
            console.log('3')
            setIndex(oldIndex => ++oldIndex)
            resetCurrent()
        }
    }

    const callbackAnswer = ({ questionAnswer: { answer, stats } }) => {
        setAnswer(answer.id)
        setStats(stats.alternatives)
    }

    const resetCurrent = () => {
        setAnswer(null)
        setStats(null)
    }

    const saveQuestion = () => {}

    const openFilters = () => {}

    const fetchQuestions = async () => {
        const {
            data: {
                questions: { data }
            }
        } = await client.query({
            query: GET_QUESTIONS,
            fetchPolicy: 'network-only',
            variables: {
                year,
                tagIds,
                levelIds,
                boardIds,
                examIds,
                courseId: course.id,
                limit
            }
        })

        setQuestions([...questions, ...data])
        if (!currentQuestion || !currentQuestion.length) {
            setCurrentQuestion(data[0])
        }
        setFirstLoad(false)
    }

    useEffect(() => {
        setCurrentQuestion(questions[index])
    }, [index])

    useEffect(() => {
        fetchQuestions()
    }, [year, tagIds, levelIds, boardIds, examIds, course.id])

    return (
        <Mutation mutation={ANSWER_MUTATION} onCompleted={callbackAnswer}>
            {(
                answerQuestion,
                { loading: loadingMutation, error: errorMutation }
            ) => {
                if (errorMutation) return `Error! ${errorMutation}`
                return (
                    <>
                        <SANQuestionHeader />
                        <div className='questions-question'>
                            <SANPortalPagesContainer>
                                {currentQuestion && currentQuestion.id}
                                <div className='questions-question__subheader'>
                                    <div className='questions-question__subheader--indicators'>
                                        <Indicator
                                            text='Corretas'
                                            percent={50}
                                            status='success'
                                        />
                                        <Indicator
                                            text='Erradas'
                                            percent={30}
                                            status='error'
                                        />
                                        <Indicator
                                            text='Puladas'
                                            percent={10}
                                        />
                                    </div>
                                    <div className='questions-question__subheader--actions'>
                                        <ESButton
                                            size='small'
                                            variant='text'
                                            bold
                                            onClick={saveQuestion}
                                        >
                                            <ESEvaIcon name='heart-outline' />
                                            Salvar questão
                                        </ESButton>
                                        <ESButton
                                            size='small'
                                            variant='text'
                                            bold
                                            onClick={openFilters}
                                            className='pl-sm pr-sm'
                                        >
                                            <ESEvaIcon name='options-2-outline' />
                                            Ver filtros
                                        </ESButton>
                                        <ESButton
                                            size='small'
                                            variant='text'
                                            circle
                                            onClick={saveQuestion}
                                        >
                                            <ESEvaIcon name='more-vertical-outline' />
                                        </ESButton>
                                    </div>
                                </div>
                                <ESQuestion
                                    question={currentQuestion}
                                    onConfirm={handleConfirm(answerQuestion)}
                                    onJump={handleJump}
                                    onNext={handleNext}
                                    loading={firstLoad || loadingMutation}
                                    answer={answer}
                                    stats={stats}
                                />
                            </SANPortalPagesContainer>
                        </div>
                    </>
                )
            }}
        </Mutation>
    )
}

SANQuestionDetailsPage.propTypes = {
    question: PropTypes.any
}

export default SANQuestionDetailsPage
