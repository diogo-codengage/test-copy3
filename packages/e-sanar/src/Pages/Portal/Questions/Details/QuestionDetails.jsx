import React, { useState } from 'react'
import ESTypography from 'sanar-ui/dist/Components/Atoms/Typography'
import ESButton from 'sanar-ui/dist/Components/Atoms/Button'
import ESQuestionHeader from '../Header'
import PropTypes from 'prop-types'
import { ESAlternative } from 'sanar-ui/dist/Components/Atoms/Alternative'
import { ESQuestion } from 'sanar-ui/dist/Components/Molecules/Question'
import { SANPortalPagesContainer } from 'Pages/Portal/Layout'
import { Query, Mutation } from 'react-apollo'
import { GET_QUESTIONS } from 'Apollo/Questions/queries/questions'
import { useAuthContext } from 'Hooks/auth'
import { ANSWER_MUTATION } from 'Apollo/Questions/mutations/answer'

const Title = ({ questionNumber, total }) => (
    <ESTypography level={4}>
        Questão {questionNumber}
        <ESTypography variant='body2'>/ {total} +</ESTypography>
    </ESTypography>
)

const Extras = ({ onClick }) => (
    <ESButton
        size='xsmall'
        color='primary'
        variant='solid'
        uppercase
        bold
        onClick={onClick}
    >
        Encerrar prática
    </ESButton>
)

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
                                    <ESQuestionHeader
                                        title={
                                            <Title
                                                questionNumber={idx + 1}
                                                total={qs.length}
                                            />
                                        }
                                        extra={
                                            <Extras
                                                onClick={() =>
                                                    console.log(
                                                        'Clicou no extra'
                                                    )
                                                }
                                            />
                                        }
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
