import React, { useState, useEffect, useMemo, useRef } from 'react'
import PropTypes from 'prop-types'

import { append } from 'ramda'
import { Mutation } from 'react-apollo'

import ESQuestion from 'sanar-ui/dist/Components/Molecules/Question'

import useWindowSize from 'sanar-ui/dist/Hooks/useWindowSize'

import { ANSWER_MUTATION } from 'Apollo/Questions/mutations/answer'
import { SANPortalPagesContainer } from 'Pages/Portal/Layout'

import { useAuthContext } from 'Hooks/auth'
import SANQuizSubheader from './Subheader'
import SANQuizFinalizedMock from './FinalizedMock'
import SANQuizFinalizedQuiz from './FinalizedQuiz'
import { useLayoutContext } from 'Pages/Portal/Layout/Context';

const SANQuiz = ({
    quiz: {
        questionItems: { data }
    },
    mock,
    bookmarked,
    handleBookmark,
    stopwatchRef
}) => {
    // const stopwatchRef = useRef()
    const { me } = useAuthContext()
    const { width } = useWindowSize()
    const [isFull, setIsFull] = useState(width <= 992)
    const [responses, setResponses] = useState([])
    const [questions, setQuestions] = useState([])
    const [index, setIndex] = useState(0)
    const [selected, setSelect] = useState()
    const [stats, setStats] = useState({
        correct: 0,
        wrong: 0,
        skipped: 0,
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

    const jump = () => {
        setStats(oldStats => ({
            ...oldStats,
            skipped: oldStats.skipped + 1
        }))
        setResponses(oldResponses => append(null, oldResponses))
    }

    const handleJump = () => {
        if (index === questions.length - 1) {
            jump()
            return
        } else {
            jump()
            setIndex(oldIndex => ++oldIndex)
        }
    }

    const handleNext = isCorrect => {
        window.scrollTo(0, 0)
        if (index === questions.length - 1) return
        setIndex(oldIndex => ++oldIndex)

        if (isCorrect) {
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
    }

    const handlePrevious = () =>
        setIndex(oldIndex => {
            if (oldIndex > 0) {
                return oldIndex - 1
            }
        })

    const callbackAnswer = ({
        questionAnswer: {
            answer: {
                question: { comments, alternatives }
            },
            stats
        }
    }) => {
        const correct = alternatives.data.find(
            alternative => alternative.correct
        )

        const questionsMap = questions.map(question => {
            if (question.id === questions[index].id) {
                return {
                    ...question,
                    status: correct.id === selected ? 'correct' : 'wrong'
                }
            }

            return question
        })

        setQuestions(questionsMap)

        setResponses(oldResponses => [
            ...oldResponses,
            {
                stats: stats.alternatives,
                comment:
                    comments.data && comments.data.length
                        ? comments.data[0]
                        : null,
                answer: correct.id,
                defaultSelected: selected
            }
        ])
    }

    useEffect(() => {
        if (stopwatchRef && stopwatchRef.current) {
            stopwatchRef.current.start()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [stopwatchRef, data])

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
        setStats(oldStats => ({
            ...oldStats,
            total: map.length
        }))
    }, [data])

    const isFinish = useMemo(() => responses.length === questions.length, [
        responses,
        questions
    ])

    const time = useMemo(
        () => isFinish && stopwatchRef && stopwatchRef.current && stopwatchRef.current.time(),
        [isFinish]
    )

    return (
        <Mutation mutation={ANSWER_MUTATION} onCompleted={callbackAnswer}>
            {(
                answerQuestion,
                { loading: loadingMutation, error: errorMutation }
            ) => {
                if (errorMutation) return `Error! ${errorMutation}`
                return (
                    <div className='video-quiz'>
                        {isFinish && mock && (
                            <SANQuizFinalizedMock {...stats} time={time} />
                        )}
                        <SANQuizSubheader
                            total={questions.length}
                            index={index}
                            questions={questions}
                            mock={mock}
                            stopwatch={!isFinish && mock}
                            ref={stopwatchRef}
                            bookmarked={bookmarked}
                            handleBookmark={handleBookmark}
                        />
                        {isFinish && !mock ? (
                            <SANQuizFinalizedQuiz {...stats} />
                        ) : (
                            <SANPortalPagesContainer className='video-quiz__questions'>
                                <ESQuestion
                                    full={isFull}
                                    question={questions[index]}
                                    onConfirm={handleConfirm(answerQuestion)}
                                    onJump={handleJump}
                                    onNext={handleNext}
                                    onPrevious={handlePrevious}
                                    loading={loadingMutation}
                                    isHistoric={isFinish}
                                    skipSeeAnswer={mock && !isFinish}
                                    {...responses[index]}
                                    propsNext={{
                                        disabled: index === questions.length - 1
                                    }}
                                    propsPrev={{
                                        disabled: index === 0
                                    }}
                                />
                            </SANPortalPagesContainer>
                        )}
                    </div>
                )
            }}
        </Mutation>
    )
}

SANQuiz.propTypes = {
    quiz: PropTypes.object.isRequired,
    mock: PropTypes.bool,
    bookmarked: PropTypes.bool,
    handleBookmark: PropTypes.func
}

export default SANQuiz
