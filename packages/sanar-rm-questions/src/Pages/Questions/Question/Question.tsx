import React, { useEffect, useState } from 'react'
import { QuestionTemplate } from './QuestionTemplate'
import { useQuestionsContext } from '../QuestionsContext'
import { BFFService } from '../../../BFF/BFFService'

export const Question = () => {

    const questionsCtx = useQuestionsContext()

    const [stats, setStats] = useState()
    const [loading, setLoading] = useState(false)

    const initialLoad = () => {
        if(!questionsCtx.currentQuestion) {
            questionsCtx.loadMoreQuestions(false);
        }
    }

    useEffect(() => {
        initialLoad();
        // eslint-disable-next-line
    },[])

    const loadNextQuestion = () => {
        let questions = questionsCtx.questions
        if (questions.length === 0) {
            questionsCtx.loadMoreQuestions(false);
        }
        questionsCtx.setCurrentQuestion(questions.shift())
        questionsCtx.setQuestions(questions)
        if (questions.length === 1) {
            questionsCtx.loadMoreQuestions(false)
        }
        questionsCtx.setCurrentAnswerId(null)
    }

    const onSkipQuestion = ({id}) => {
        loadNextQuestion()
        BFFService.skipQuestion(id)
        questionsCtx.increaseTotalSkipped()
    }

    const onNextQuestion = (correct) => {
        loadNextQuestion()
    }

    const onConfirmResponse = (alternativeId) => {
        const answerId = questionsCtx.currentQuestion.alternatives.data
            .find(alternative => alternative.correct === true).id
        const correct = alternativeId === answerId
        const questionId = questionsCtx.currentQuestion.id
        setLoading(true)
        BFFService.confirmResponse({alternativeId, correct, questionId})
        .then(({data}) => {
            setStats(data.questionAnswer.stats.alternatives)
            setLoading(false)
            let event = 'QuestionAnsweredCorrectly'
            if (correct) {
                questionsCtx.increaseTotalCorrect()
            } else {
                event = 'QuestionAnsweredWrongly'
                questionsCtx.increaseTotalWrong()
            }
            // @ts-ignore
            window.analytics.track(event, {
                questionId
            });
            questionsCtx.setCurrentAnswerId(answerId)
        })
    }

    if (!questionsCtx.currentQuestion && questionsCtx.questions.length > 0 ) {
        loadNextQuestion();
    }

    return (
        <QuestionTemplate
            onJump={onSkipQuestion}
            onNext={onNextQuestion}
            onConfirm={onConfirmResponse}
            stats={stats}
            loading={loading}
        />
    )

}
