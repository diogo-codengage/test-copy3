import React, { useState, useEffect, useMemo, useRef } from 'react'
import PropTypes from 'prop-types'

import { append } from 'ramda'
import { Mutation } from 'react-apollo'
import { message } from 'antd'
import { useTranslation } from 'react-i18next'

import ESQuestion from 'sanar-ui/dist/Components/Molecules/Question'

import useWindowSize from 'sanar-ui/dist/Hooks/useWindowSize'

import { CREATE_PROGRESS } from 'Apollo/Classroom/mutations/video-progress'
import { CREATE_BOOKMARK } from 'Apollo/Classroom/mutations/bookmark'
import { ANSWER_MUTATION } from 'Apollo/Questions/mutations/answer'
import { GET_BOOKMARK } from 'Apollo/Classroom/queries/bookmark'
import { SANPortalPagesContainer } from 'Pages/Portal/Layout'

import { useApolloContext } from 'Hooks/apollo'
import { useAuthContext } from 'Hooks/auth'
import SANQuizSubheader from './Subheader'
import SANQuizFinalizedMock from './FinalizedMock'
import SANQuizFinalizedQuiz from './FinalizedQuiz'
import { SANErrorPiece } from 'sanar-ui/dist/Components/Molecules/Error'

const SANQuiz = ({
    quiz: {
        questionItems: { data },
        id: resourceId
    },
    mock,
    stopwatchRef,
    parentVideoId,
    scrollToOffsetElementPosition
}) => {
    const ref = useRef()
    const { t } = useTranslation('esanar')
    const client = useApolloContext()
    const { me, getEnrollment } = useAuthContext()
    const { width } = useWindowSize()
    const [isFull, setIsFull] = useState(width <= 992)
    const [responses, setResponses] = useState([])
    const [questions, setQuestions] = useState([])
    const [index, setIndex] = useState(0)
    const [selected, setSelect] = useState()
    const [bookmarked, setBookmark] = useState()
    const [stats, setStats] = useState({
        correct: 0,
        wrong: 0,
        skipped: 0,
        total: 0
    })

    const { id: enrollmentId } = getEnrollment()

    const handleProgress = async percentage => {
        try {
            await client.mutate({
                mutation: CREATE_PROGRESS,
                variables: {
                    percentage: Math.round(percentage),
                    enrollmentId,
                    resourceId,
                    resourceType: 'Quiz',
                    parentVideoId
                }
            })
        } catch (err) {
            console.error(err)
        }
    }

    const handleBookmark = async () => {
        try {
            setBookmark(old => !old)
            client.mutate({
                mutation: CREATE_BOOKMARK,
                variables: {
                    resourceId: questions[index].id,
                    resourceType: 'Question'
                }
            })
        } catch {
            message.error(t('classroom.failHandleBookmark'))
        }
    }

    const handleConfirm = mutation => async alternative => {
        try {
            setSelect(alternative)
            mutation({
                variables: {
                    userId: me.id,
                    alternativeIds: [alternative],
                    questionId: questions[index].id
                }
            })
        } catch {
            t('classroom.failReplyQuestion')
        }
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
        if (scrollToOffsetElementPosition) {
            window.scrollTo(
                0,
                ref.current.offsetTop + ref.current.offsetParent.offsetTop
            )
        } else {
            window.scrollTo(0, 0)
        }

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

        if (index === questions.length - 1 && mock) return
        setIndex(oldIndex => ++oldIndex)
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

        const anchor = mock ? index - 1 : index

        const questionsMap = questions.map(question => {
            if (question.id === questions[anchor].id) {
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

        handleProgress((1 * 100) / questions.length)
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

    useEffect(() => {
        if (questions[index]) {
            const fetchData = async () => {
                try {
                    const {
                        data: { bookmark }
                    } = await client.query({
                        query: GET_BOOKMARK,
                        fetchPolicy: 'network-only',
                        variables: {
                            resourceId: questions[index].id
                        }
                    })

                    setBookmark(!!bookmark)
                } catch (err) {
                    console.error(err)
                }
            }
            fetchData()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [index, questions])

    const isFinish = useMemo(() => responses.length === questions.length, [
        responses,
        questions
    ])

    const time = useMemo(
        () =>
            isFinish &&
            stopwatchRef &&
            stopwatchRef.current &&
            stopwatchRef.current.time(),
        [isFinish, stopwatchRef]
    )

    return (
        <Mutation mutation={ANSWER_MUTATION} onCompleted={callbackAnswer}>
            {(
                answerQuestion,
                { loading: loadingMutation, error: errorMutation }
            ) => {
                if (errorMutation)
                    return (
                        <SANErrorPiece
                            message={t('classroom.mock.errorAnswering')}
                            dark={true}
                        />
                    )
                return (
                    <div ref={ref} className='video-quiz'>
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
    scrollToOffsetElementPosition: PropTypes.bool
}

export default SANQuiz
