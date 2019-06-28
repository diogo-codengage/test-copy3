import React, { useState } from 'react'
import { QuestionTemplate } from './QuestionTemplate'
import { useQuestionsContext } from '../QuestionsContext'
import { QuestionsInputFilter } from '../../../BFF/QuestionsInputFilter'
import { BFFService } from '../../../BFF/BFFService'
import { normalizeString } from '../../../Util/normalizeString'
import { toCorrelacaoTagName } from '../../../Util/corelacaoEntrePlataformas'

export const Question = () => {

    const questionsCtx = useQuestionsContext()

    const [stats, setStats] = useState()
    const [loading, setLoading] = useState(false)

    const getParams = async ():Promise<QuestionsInputFilter> => {
        if(!!questionsCtx.course) {
            return getParamsFromCourse()
        }
        return getParamsFromFilters()
    }

    const normalizeEndCompare = (o1: string, o2: string) =>{
        return  normalizeString(o1) === normalizeString(o2)
    }

    const getParamsFromCourse = async ():Promise<QuestionsInputFilter> => {

        const tagsIds = questionsCtx.allTags
            .filter(t => normalizeEndCompare(t.label, toCorrelacaoTagName(questionsCtx.course.moduleName)))
            .map(t => t.value)

        const specialtiesIds = questionsCtx.allSpecialties.flatMap(s => s.children)
            .filter(v => normalizeEndCompare(v.label,questionsCtx.course.subSpecialtyName))
            .map(v => v.value)

        return {
            specialtiesIds,
            institutionsIds: [],
            tagsIds,
            states: [],
            years: [],
            isCommentedByExpert: null,
        }
    }

    const getParamsFromFilters = (): QuestionsInputFilter  => {

        const idsSelectedSubSpecialties = questionsCtx.selectedSubSpecialties.map(ss => ss.value);

        return  {
            specialtiesIds: questionsCtx.selectedSpecialties
                .filter( s => !s.children.map(ss => ss.value).find(ss => idsSelectedSubSpecialties.includes(ss) ) )
                .map(s => s.value)
                .concat(questionsCtx.selectedSubSpecialties
                    .map(s => s.value)),
            institutionsIds: questionsCtx.selectedInstitutions.map( i => i.value ),
            tagsIds: questionsCtx.selectedTags.map( t => t.value),
            states: questionsCtx.selectedStates.map(s => s.value),
            years: questionsCtx.selectedYears.map(v => v.value),
            isCommentedByExpert: questionsCtx.isCommentedByExpert,
        }
    }

    const pushQuestions = (moreQuestions) => {

        if(questionsCtx.questions.length > 1){
            return;
        }
        console.log('pushQuestions')
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

    const loadMoreQuestions = async () => {
            const filters = await getParams()
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

    if(!questionsCtx.currentQuestion) {
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
