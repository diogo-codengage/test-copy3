import React, { useState } from 'react'
import { QuestionTemplate } from './QuestionTemplate'
import { useQuestionsContext } from '../QuestionsContext'
import { QuestionsInputFilter } from '../../../BFF/QuestionsInputFilter'
import { BFFService } from '../../../BFF/BFFService'

export const Question = () => {

    const questionsCtx = useQuestionsContext()

    const [stats, setStats] = useState()
    const [loading, setLoading] = useState(false)

    const getParamsFromFilters = (): QuestionsInputFilter  => {
        return  {
            tagsIds: questionsCtx.selectedTags.map( t => t.value),
            states: questionsCtx.selectedStates.map(s => s.value),
            specialtiesIds: questionsCtx.selectedSpecialties
                .map(s => s.value)
                .concat(questionsCtx.selectedSubSpecialties
                    .map(s => s.value)),
            isCommentedByExpert: questionsCtx.isCommentedByExpert,
            years: questionsCtx.selectedYears.map(v => v.value)
        }
    }

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
        const filters = getParamsFromFilters()
        BFFService.loadMoreQuestions(filters)
            .then(function({ data }) {
                questionsCtx.setQuestionsRequests(questionsCtx.questionsRequests + 1)
                return pushQuestions(data.questions.data)
            })
    }

    const onSkipQuestion = ({id}) => {
        loadNextQuestion()
        BFFService.skipQuestion(id)
        questionsCtx.increaseTotalSkipped()
    }

    const onNextQuestion = (correct) => {
        loadNextQuestion()
    }

    if(! questionsCtx.currentQuestion) {
        loadMoreQuestions()
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
            if(correct) {
                questionsCtx.increaseTotalCorrect()
            }else {
                questionsCtx.increaseTotalWrong()
            }
            questionsCtx.setCurrentAnswerId(answerId)
        })
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
