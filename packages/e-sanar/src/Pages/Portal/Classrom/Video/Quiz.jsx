import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

import { Mutation } from 'react-apollo'

import ESQuestion from 'sanar-ui/dist/Components/Molecules/Question'

import useWindowSize from 'sanar-ui/dist/Hooks/useWindowSize'

import { ANSWER_MUTATION } from 'Apollo/Questions/mutations/answer'
import { SANPortalPagesContainer } from 'Pages/Portal/Layout'

import { useAuthContext } from 'Hooks/auth'
import SANSubheader from './Subheader'

const SANClassroomVideoQuiz = ({
    quiz: {
        questionItems: { data }
    }
}) => {
    const { me } = useAuthContext()

    const { width } = useWindowSize()
    const [isFull, setIsFull] = useState(width <= 992)
    const [response, setResponse] = useState()
    const [questions, setQuestions] = useState([])
    const [index, setIndex] = useState(0)

    const handleConfirm = mutation => alternative =>
        mutation({
            variables: {
                userId: me.id,
                alternativeIds: [alternative],
                questionId: questions[index].id
            }
        })

    const handleJump = () => handleNext()

    const handleNext = isCorrect => {
        setIndex(oldIndex => ++oldIndex)
        setResponse()
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
                        <SANPortalPagesContainer className='classrom__video-quiz'>
                            <SANSubheader
                                total={questions.length}
                                index={index}
                                questions={questions}
                            />
                            <ESQuestion
                                full={isFull}
                                question={questions[index]}
                                onConfirm={handleConfirm(answerQuestion)}
                                onJump={handleJump}
                                onNext={handleNext}
                                loading={loadingMutation}
                                {...response}
                            />
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
