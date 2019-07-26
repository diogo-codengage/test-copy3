import React, { useState } from 'react'
import { FilterTemplate, IFilterTemplateProps } from './FilterTemplate'
import { useQuestionsContext } from '../QuestionsContext'
import { Speciality } from '../../../BFF/speciality'

export const Filter: React.FC = () => {

    const ctx = useQuestionsContext()
    const [allSubSpecialties, setAllSubSpecialties ] = useState(ctx.allSpecialties.flatMap(s => s.children))

    const clearQuestions = () => {
        ctx.setQuestions([])
        ctx.setCurrentQuestion(null)
        ctx.setCurrentAnswerId(null)
    }

    const params: IFilterTemplateProps = {

        allSpecialties: ctx.allSpecialties,
        allSubSpecialties,
        allTags: ctx.allTags,

        setSelectedSpecialties: (specialities: Speciality[]) => {
            ctx.setSelectedSpecialties(specialities)
            setAllSubSpecialties( specialities.flatMap(s => s.children) )
            if(ctx.selectedSubSpecialties.length > 0 && specialities.length > 0){
                ctx.setSelectedSubSpecialties( ctx.selectedSubSpecialties.filter( ss => {
                    return specialities.flatMap(s => s.children).map(s => s.value).includes(ss.value);
                }))
            }
            clearQuestions()
        },
        setSelectedSubSpecialties: v => {
            ctx.setSelectedSubSpecialties(v)
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
            console.log( {years: v})
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
        setShowAdvancedFilters: ctx.setShowAdvancedFilters,

        allInstitutions: ctx.allInstitutions,
        selectedInstitutions: ctx.selectedInstitutions,
        setSelectedInstitutions: ctx.setSelectedInstitutions,

    } as IFilterTemplateProps

    return (
        <FilterTemplate {...params} />
    )
}
