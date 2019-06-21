import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

import { useTranslation } from 'react-i18next'
import { Mutation } from 'react-apollo'

import ESQuestion from 'sanar-ui/dist/Components/Molecules/Question'
import ESCircleProgress from 'sanar-ui/dist/Components/Atoms/CircleProgress'
import ESTypography from 'sanar-ui/dist/Components/Atoms/Typography'
import ESEvaIcon from 'sanar-ui/dist/Components/Atoms/EvaIcon'

import useWindowSize from 'sanar-ui/dist/Hooks/useWindowSize'

import { ANSWER_MUTATION } from 'Apollo/Questions/mutations/answer'
import { SANPortalPagesContainer } from 'Pages/Portal/Layout'

import { useAuthContext } from 'Hooks/auth'
import SANSubheader from './Subheader'

const Progress = ({ percent, status, label }) => (
    <ESCircleProgress
        strokeWidth={6}
        showInfo
        format={percent => (
            <>
                <ESTypography
                    className='mb-xxs'
                    regular
                    transform='initial'
                    variant='overline'
                >
                    {label}:
                </ESTypography>
                <ESTypography variant='caption' strong>
                    {percent}%
                </ESTypography>
            </>
        )}
        width={76}
        percent={percent}
        status={status}
    />
)

const SANClassroomVideoQuiz = ({
    quiz: {
        questionItems: { data }
    }
}) => {
    const { t } = useTranslation('esanar')
    const { me } = useAuthContext()

    const { width } = useWindowSize()
    const [isFull, setIsFull] = useState(width <= 992)
    const [response, setResponse] = useState()
    const [questions, setQuestions] = useState([])
    const [index, setIndex] = useState(0)
    const [selected, setSelect] = useState()
    const [stats, setStats] = useState({
        correct: 0,
        wrong: 0,
        jump: 0,
        total: 0
    })

    const handleConfirm = mutation => alternative => {
        setSelect(alternative)
        mutation({
            variables: {
                userId: me.id,
                alternativeIds: [alternative],
                questionId: questions[index].id
            }
        })
    }

    const handleJump = () => {
        if (index === questions.length - 1) return
        setStats(oldStats => ({
            ...oldStats,
            jump: oldStats.jump + 1,
            total: oldStats.total + 1
        }))
        setIndex(oldIndex => ++oldIndex)
        setResponse()
    }

    const handleNext = isCorrect => {
        if (index === questions.length - 1) return
        setIndex(oldIndex => ++oldIndex)
        setResponse()

        if (isCorrect) {
            setStats(oldStats => ({
                ...oldStats,
                correct: oldStats.correct + 1,
                total: oldStats.total + 1
            }))
        } else {
            setStats(oldStats => ({
                ...oldStats,
                wrong: oldStats.wrong + 1,
                total: oldStats.total + 1
            }))
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

            const test = questions.map(question => {
                if (question.id === questions[index].id) {
                    return {
                        ...question,
                        status: correct.id === selected ? 'correct' : 'wrong'
                    }
                }

                return question
            })

            setQuestions(test)

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

    useEffect(() => {
        setIsFull(width <= 992)
    }, [width])

    useEffect(() => {
        // api payload quiz > questionItems > data[] > question
        const map = data.map((data, index) => ({
            ...data.question,
            index
        }))
        setQuestions(map)
    }, [data])

    return (
        <Mutation mutation={ANSWER_MUTATION} onCompleted={callbackAnswer}>
            {(
                answerQuestion,
                { loading: loadingMutation, error: errorMutation }
            ) => {
                if (errorMutation) return `Error! ${errorMutation}`
                return (
                    <>
                        <SANPortalPagesContainer className='classroom__video-quiz'>
                            <SANSubheader
                                total={questions.length}
                                index={index}
                                questions={questions}
                            />
                            {index === questions.length - 1 ? (
                                <div className='classroom__video-quiz__finalized'>
                                    <div className='title'>
                                        <ESEvaIcon
                                            size='xlarge'
                                            name='checkmark-circle-outline'
                                        />
                                        <ESTypography level={4} regular>
                                            {t('classroom.quizFinalized')}
                                        </ESTypography>
                                    </div>
                                    <div className='d-flex align-items-center pb-lg pt-lg pl-xs pr-xs'>
                                        <Progress
                                            percent={
                                                (stats.correct * 100) /
                                                stats.total
                                            }
                                            status='success'
                                            label={t('classroom.correct')}
                                        />
                                        <Progress
                                            percent={
                                                (stats.wrong * 100) /
                                                stats.total
                                            }
                                            status='error'
                                            label={t('classroom.wrong')}
                                        />
                                        <Progress
                                            percent={
                                                (stats.jump * 100) / stats.total
                                            }
                                            label={t('classroom.skipped')}
                                        />
                                    </div>
                                </div>
                            ) : (
                                <ESQuestion
                                    full={isFull}
                                    question={questions[index]}
                                    onConfirm={handleConfirm(answerQuestion)}
                                    onJump={handleJump}
                                    onNext={handleNext}
                                    loading={loadingMutation}
                                    {...response}
                                />
                            )}
                        </SANPortalPagesContainer>
                    </>
                )
            }}
        </Mutation>
    )
}

SANClassroomVideoQuiz.propTypes = {
    question: PropTypes.any
}

export default SANClassroomVideoQuiz
