import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { ESQuestion } from 'sanar-ui/dist/Components/Molecules/Question'
import { SANPortalPagesContainer } from 'Pages/Portal/Layout'
import { Query, Mutation } from 'react-apollo'
import { GET_QUESTIONS } from 'Apollo/Questions/queries/questions'
import { ANSWER_MUTATION } from 'Apollo/Questions/mutations/answer'
import ESCircleProgress from 'sanar-ui/dist/Components/Atoms/CircleProgress'
import ESEvaIcon from 'sanar-ui/dist/Components/Atoms/EvaIcon'
import SANQuestionHeader from './Header'
import { useAuthContext } from 'Hooks/auth'
import ESTypography from 'sanar-ui/dist/Components/Atoms/Typography'
import ESButton from 'sanar-ui/dist/Components/Atoms/Button'

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

    const saveQuestion = () => {}

    const openFilters = () => {}

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
                                        <div className='san-questions-details__subheader-container'>
                                            <div className='san-questions-details__subheader-container--left-side'>
                                                <div className='san-questions-details__subheader-container__progress-container'>
                                                    <div className='san-questions-details__subheader-container__progress-container--label'>
                                                        <ESTypography variant='body2'>
                                                            Corretas:
                                                        </ESTypography>
                                                    </div>
                                                    <ESCircleProgress
                                                        percent={50}
                                                        showInfo={true}
                                                        status='success'
                                                        strokeLinecap='square'
                                                        width={44}
                                                        strokeWidth={6}
                                                    />
                                                </div>
                                                <div className='san-questions-details__subheader-container__progress-container'>
                                                    <div className='san-questions-details__subheader-container__progress-container--label'>
                                                        <ESTypography variant='body2'>
                                                            Erradas:
                                                        </ESTypography>
                                                    </div>
                                                    <ESCircleProgress
                                                        percent={50}
                                                        showInfo={true}
                                                        status='danger'
                                                        strokeLinecap='square'
                                                        width={44}
                                                        strokeWidth={6}
                                                    />
                                                </div>
                                                <div className='san-questions-details__subheader-container__progress-container'>
                                                    <div className='san-questions-details__subheader-container__progress-container--label'>
                                                        <ESTypography variant='body2'>
                                                            Puladas:
                                                        </ESTypography>
                                                    </div>
                                                    <ESCircleProgress
                                                        percent={50}
                                                        showInfo={true}
                                                        status='normal'
                                                        strokeLinecap='square'
                                                        width={44}
                                                        strokeWidth={6}
                                                    />
                                                </div>
                                            </div>
                                            <div className='san-questions-details__subheader-container'>
                                                <ESButton
                                                    size='xsmall'
                                                    color='secondary'
                                                    variant='text'
                                                    uppercase
                                                    bold
                                                    onClick={saveQuestion}
                                                >
                                                    <ESEvaIcon
                                                        name='heart-outline'
                                                        color='default'
                                                    />
                                                    Salvar questão
                                                </ESButton>
                                                <ESButton
                                                    size='xsmall'
                                                    color='secondary'
                                                    variant='text'
                                                    uppercase
                                                    bold
                                                    onClick={openFilters}
                                                >
                                                    <ESEvaIcon
                                                        name='options-2-outline'
                                                        color='default'
                                                    />
                                                    Ver filtros
                                                </ESButton>
                                                <ESButton
                                                    size='xsmall'
                                                    color='secondary'
                                                    variant='text'
                                                    uppercase
                                                    bold
                                                    onClick={saveQuestion}
                                                >
                                                    <ESEvaIcon
                                                        name='more-vertical-outline'
                                                        color='default'
                                                    />
                                                </ESButton>
                                            </div>
                                        </div>
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
