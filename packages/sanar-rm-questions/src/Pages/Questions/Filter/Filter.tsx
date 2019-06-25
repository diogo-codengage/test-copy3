import React from 'react'
import { FilterTemplate, IFilterTemplateProps } from './FilterTemplate'
import { useQuestionsContext } from '../QuestionsContext'

export const Filter: React.FC = () => {

    const ctx = useQuestionsContext()

    const clearQuestions = () => {
        ctx.setQuestions([])
        ctx.setCurrentQuestion(null)
        ctx.setCurrentAnswerId(null)
    }

    const params: IFilterTemplateProps = {

        allSpecialties: ctx.allSpecialties,
        allSubSpecialties: ctx.allSubSpecialties,
        allTags: ctx.allTags,

        setSelectedSpecialties: v => {
            ctx.setSelectedSpecialties(v)
            clearQuestions()
        },
        setSelectedSubSpecialties: v => {
            ctx.setSelectedSpecialties(v)
            clearQuestions()
        },
        setSelectedTags: v => {
            ctx.setSelectedTags(v)
            clearQuestions()
        },
        setSelectedStates: v => {
            ctx.setSelectedStates(v)
            clearQuestions()
        },
        setSelectedYears: v => {
            ctx.setSelectedYears(v)
            clearQuestions()
        },
        setCommentedByExpert: v => {
            ctx.setCommentedByExpert(v)
            clearQuestions()
        },

        selectedSpecialties: ctx.selectedSpecialties,
        selectedSubSpecialties: ctx.selectedSubSpecialties,
        selectedTags: ctx.selectedTags,
        selectedStates: ctx.selectedStates,
        selectedYears: ctx.selectedYears,
        isCommentedByExpert: ctx.isCommentedByExpert,

        showAdvancedFilters: ctx.showAdvancedFilters,
        setShowAdvancedFilters: ctx.setShowAdvancedFilters

    } as IFilterTemplateProps

    return (
        <FilterTemplate {...params} />
    )
}
