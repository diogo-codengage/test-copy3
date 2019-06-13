import React from 'react'
import ESQuestion from 'sanar-ui/dist/Components/Molecules/Question'
import { RMContainer } from '../../../Components/RMContainer'
import { RMHeader } from '../../../Components/RMHeader'

interface IProps {
    question: any
    onConfirm?: Function
    onNext?: Function
    onJump?: Function
    loading?: boolean
}

export const QuestionTemplate = ({question, onConfirm, onNext, onJump, loading }:IProps) => {

    return <>
        <RMHeader />
        <RMContainer>
            <ESQuestion
                loading={loading}
                question={question}
                answered={true}
                onConfirm={onConfirm}
                onNext={onNext}
                onJump={onJump}
            />
            {/*<pre>{JSON.stringify(question, null,4)}</pre>*/}
        </RMContainer>
    </>

}
