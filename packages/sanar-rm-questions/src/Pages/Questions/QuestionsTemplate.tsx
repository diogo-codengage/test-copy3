import React, { useContext, useState } from 'react'
import { Filter } from './Filter/Filter'
import { Question } from './Question/Question'
import { EndSession } from './EndSession/EndSession'
import { QuestionPageType, useQuestionsContext } from './QuestionsContext'

export const QuestionsTemplate = () => {

    const questionsCtx = useQuestionsContext()

    return (
        <>
            {questionsCtx.currentPage === QuestionPageType.Filter && <Filter/>}
            {questionsCtx.currentPage === QuestionPageType.Question && <Question/>}
            {questionsCtx.currentPage === QuestionPageType.EndSession && <EndSession/>}
        </>
    )
}
