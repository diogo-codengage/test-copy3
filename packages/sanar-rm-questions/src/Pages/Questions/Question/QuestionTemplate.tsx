import React from 'react'
import ESQuestion from 'sanar-ui/dist/Components/Molecules/Question'
import { RMContainer } from '../../../Components/RMContainer'
import { RMHeader } from '../../../Components/RMHeader'
import { useQuestionsContext } from '../QuestionsContext'
import { SessionStatusDashboard } from './SessionStatusDashboard'

interface IProps {
    onConfirm?: Function
    onNext?: Function
    onJump?: Function
}

export const QuestionTemplate = ({ onConfirm, onNext, onJump }:IProps) => {

    const questionCtx = useQuestionsContext()

    return <>
        <RMHeader />
        <SessionStatusDashboard/>
        <RMContainer>
            <ESQuestion
                loading={!questionCtx.currentQuestion}
                question={questionCtx.currentQuestion}
                answer={questionCtx.currentAnswerId}
                onConfirm={onConfirm}
                onNext={onNext}
                onJump={onJump}
                onlyStep={true}
            />
            {/*<pre>{JSON.stringify(question, null,4)}</pre>*/}
        </RMContainer>
    </>

}
