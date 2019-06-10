import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Query, Mutation } from 'react-apollo'

import { ESQuestion } from 'sanar-ui/dist/Components/Molecules/Question'

import { GET_QUESTIONS } from 'Apollo/Questions/queries/questions'
import { ANSWER_MUTATION } from 'Apollo/Questions/mutations/answer'

import SANQuestionHeader from './Header'

import { SANPortalPagesContainer } from 'Pages/Portal/Layout'
import { useAuthContext } from 'Hooks/auth'

const SANQuestionDetailsPage = () => {
    const [qs, setQuestions] = useState({})
    const [idx, setIndex] = useState(0)
    const [currentQuestion, setCurrentQuestion] = useState({})
    const [alternative, selectAlternative] = useState(null)
    const [answer, setAnswer] = useState(null)
    const [answered, setAnswered] = useState(false)

    const { me } = useAuthContext()

    const onNextQuestion = (index, action) => {
        if (index < qs.length) {
            setCurrentQuestion(qs[index])
            setIndex(idx + 1)
            setAnswered(false)
            selectAlternative(null)
        }
    }

    const onConfirmQuestion = mutation => {
        mutation({
            variables: {
                userId: me.id,
                alternativeIds: [alternative],
                questionId: currentQuestion.id
            }
        })
    }

    const handleComplete = data => {
        const { questionAnswer } = data
        const { answer } = questionAnswer
        const correctAnswer = answer && answer.id

        setAnswer(correctAnswer)
    }

    return (
        <Mutation
            mutation={ANSWER_MUTATION}
            onCompleted={data => handleComplete(data)}
        >
            {QuestionAnswer => {
                return (
                    <Query
                        query={GET_QUESTIONS}
                        onCompleted={({ questions }) => {
                            setQuestions(questions.data)
                            setIndex(0)
                            setCurrentQuestion(questions.data[0])
                        }}
                    >
                        {() => {
                            return (
                                <div className='san-questions-details'>
                                    <SANQuestionHeader
                                        current={idx + 1}
                                        total={qs.length}
                                    />
                                    <SANPortalPagesContainer>
                                        <ESQuestion
                                            alternatives={
                                                currentQuestion.alternatives &&
                                                currentQuestion.alternatives
                                                    .data
                                            }
                                            answer={answer}
                                            answered={answered}
                                            content={currentQuestion.statement}
                                            id={
                                                currentQuestion &&
                                                currentQuestion.id
                                            }
                                            nextText={
                                                answered
                                                    ? 'Próxima'
                                                    : 'Confirmar'
                                            }
                                            selectedAlternative={alternative}
                                            title={
                                                currentQuestion.instituition &&
                                                currentQuestion.instituition
                                                    .name
                                            }
                                            onConfirm={() =>
                                                onConfirmQuestion(
                                                    QuestionAnswer
                                                )
                                            }
                                            onJump={() =>
                                                onNextQuestion(idx + 1)
                                            }
                                            onNext={() =>
                                                onNextQuestion(idx + 1)
                                            }
                                            onSelectAlternative={
                                                selectAlternative
                                            }
                                        />
                                    </SANPortalPagesContainer>
                                </div>
                            )
                        }}
                    </Query>
                )
            }}
        </Mutation>
    )
}

SANQuestionDetailsPage.propTypes = {
    question: PropTypes.any
}

export default SANQuestionDetailsPage
