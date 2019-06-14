import React, { useContext, useEffect } from 'react'
import { QuestionTemplate } from './QuestionTemplate'
import { ApolloContext } from 'react-apollo'
import { getQuestionsQuery } from '../../../Apollo/Questions/get-questions'
import { useQuestionsContext } from '../QuestionsContext'

export const Question = () => {

    const questionsCtx = useQuestionsContext()
    const { client } = useContext(ApolloContext)

    const pushQuestions = (moreQuestions) => {
        let questions = questionsCtx.questions

        questions.push(...moreQuestions)
        if (!questionsCtx.currentQuestion) {
            questionsCtx.setCurrentQuestion(questions.shift())
        }
        questionsCtx.setQuestions(questions)
    }

    const loadNextQuestion = () => {
        let questions = questionsCtx.questions
        questionsCtx.setCurrentQuestion(questions.shift())
        questionsCtx.setQuestions(questions)
        if (questions.length === 1) {
            loadMoreQuestions()
        }
        questionsCtx.setCurrentAnswerId(null)
    }

    const loadMoreQuestions = () => {
        client.query(
            {
                query: getQuestionsQuery(questionsCtx.filters),
                fetchPolicy: 'no-cache'
            })
            .then(({ data }) => pushQuestions(data.questions.data))
    }

    const onSkipQuestion = () => {
        loadNextQuestion()
        questionsCtx.increaseTotalSkipped()
    }

    const onNextQuestion = (correct) => {
        loadNextQuestion()

        if(correct) {
            questionsCtx.increaseTotalCorrect()
        }else {
            questionsCtx.increaseTotalWrong()
        }
    }

    if(! questionsCtx.currentQuestion) {
        loadMoreQuestions();
    }

    const onConfirmResponse = () => {
        const answerId = questionsCtx.currentQuestion.alternatives.data
            .find(alternative => alternative.correct === true).id

        questionsCtx.setCurrentAnswerId(answerId)
    }

    return (
            <QuestionTemplate
                onJump={onSkipQuestion}
                onNext={onNextQuestion}
                onConfirm={onConfirmResponse}
            />
    )

}
