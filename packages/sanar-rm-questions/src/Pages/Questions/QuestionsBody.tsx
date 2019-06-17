import React from 'react'
import { QuestionPageType, useQuestionsContext } from './QuestionsContext'
import { Filter } from './Filter/Filter'
import { Question } from './Question/Question'
import { EndSession } from './EndSession/EndSession'

export const QuestionsBody = () => {
    const { currentPage } = useQuestionsContext()

    const renderCurrentPage = (currentPage: QuestionPageType) => {
        switch (currentPage) {
            case QuestionPageType.Filter:
                return <Filter/>
            case QuestionPageType.Question:
                return <Question/>
            case QuestionPageType.EndSession:
                return <EndSession/>
            default:
                return 'not found'
        }
    }

    return <>
        {renderCurrentPage(currentPage)}</>
}
