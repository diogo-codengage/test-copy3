import React from 'react'
import { QuestionPageType, useQuestionsContext } from './QuestionsContext'
import { Filter } from './Filter/Filter'
import { Question } from './Question/Question'

export const QuestionsBody = () => {
    const { currentPage } = useQuestionsContext()

    if (currentPage === QuestionPageType.Filter) {
        return <Filter/>
    } else {
        return <Question/>
    }

}
