import React, { useState } from 'react'
import { Question } from './Question/Question'
import { Filter } from './Filter/Filter'

interface IProps {
    isFromCourse?: boolean
    courseLinkReturn: string
}

export const QuestionsPage = ({isFromCourse, courseLinkReturn}:IProps) => {

    const [editingFilters, setEditingFilters] = useState(true)
    const [questionsFilter, setQuestionsFilter] = useState()

    const startQuestionsWithFilter = (filters) => {
        console.log(filters)
        setQuestionsFilter(filters)
        setEditingFilters(false)
    }

    if(editingFilters)
        return <Filter onStart={filters => startQuestionsWithFilter(filters) } />

    return <Question isFromCourse={isFromCourse} questionsFilter={questionsFilter}/>

}
