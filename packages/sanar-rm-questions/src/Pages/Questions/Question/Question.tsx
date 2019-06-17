import React, { useContext, useState } from 'react'
import { QuestionTemplate } from './QuestionTemplate'
import { ApolloContext } from 'react-apollo'
import { getQuestionsQuery } from '../../../Apollo/Questions/get-questions'
import { useQuestionsContext } from '../QuestionsContext'
import { questionAnswer } from '../../../Apollo/Questions/questionAnswer'
import { questionSkip } from '../../../Apollo/Questions/questionSkip'
import { useAuthContext } from '../../../AuthContext'
import { QuestionsInputFilter } from '../../../Apollo/QuestionsInputFilter'

export const Question = () => {

    const questionsCtx = useQuestionsContext()
    const { client } = useContext(ApolloContext)
    const { userId } = useAuthContext()

    const [stats, setStats] = useState()
    const [loading, setLoading] = useState(false)

    const getFilters = (): QuestionsInputFilter  => {
        return  {
            tagsIds: questionsCtx.selectedTags.map( t => t.value),
            state: questionsCtx.formFilterState.selectedYear,
            specialtiesIds: questionsCtx.selectedSpecialties
                .map(s => s.value)
                .concat(questionsCtx.selectedSubSpecialties
                    .map(s => s.value)),
            isCommentedByExpert: questionsCtx.formFilterState.isCommentedByExpert,
            year: questionsCtx.formFilterState.selectedYear ? parseInt(questionsCtx.formFilterState.selectedYear.format('YYYY')) : null
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
        const filters = getFilters();
        console.log({filters})
        client.query(
            {
                query: getQuestionsQuery(filters),
                fetchPolicy: 'no-cache'
            })
            .then(({ data }) => pushQuestions(data.questions.data))
    }

    const onSkipQuestion = ({id: questionId}) => {
        loadNextQuestion()

        client.mutate({
            mutation: questionSkip,
            variables: {userId, questionId},
        }).then(() => {})

        questionsCtx.increaseTotalSkipped()
    }

    const onNextQuestion = (correct) => {
        loadNextQuestion()
    }

    if(! questionsCtx.currentQuestion) {
        loadMoreQuestions();
    }

    const onConfirmResponse = (alternativeId) => {

        const answerId = questionsCtx.currentQuestion.alternatives.data
            .find(alternative => alternative.correct === true).id

        if(!alternativeId){
            return
        }

        const correct = alternativeId === answerId
        const questionId = questionsCtx.currentQuestion.id;

        setLoading(true)
        client.mutate({mutation: questionAnswer, variables: {
            userId, alternativeId, correct, questionId}})
            .then(({data, errors}) => {
                console.log({data, errors})

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
