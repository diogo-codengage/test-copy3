import React from 'react'
import { useQuestionsContext } from './QuestionsContext'
import { RMSplashLoader } from '../../Components/RMSplashLoader'
import { QuestionsHeader } from './QuestionsHeader'
import { QuestionsBody } from './QuestionsBody'

export const QuestionsTemplate = () => {

    const { loading } = useQuestionsContext()

    if (loading)
        return <RMSplashLoader/>

    return <div style={{display: 'flex', flexDirection: 'column', height: '100vh'}}>
        <QuestionsHeader/>
        <div style={{flexGrow: 1, overflow: 'auto'}}>
            <QuestionsBody/>
        </div>
    </div>

}
