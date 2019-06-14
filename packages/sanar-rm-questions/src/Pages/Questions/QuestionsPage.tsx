import React from 'react';

import { QuestionsContextProvider } from './QuestionsContext'
import { QuestionsTemplate } from './QuestionsTemplate'

export const QuestionsPage = () => {
    return (
        <QuestionsContextProvider>
            <QuestionsTemplate/>
        </QuestionsContextProvider>
    )
}
