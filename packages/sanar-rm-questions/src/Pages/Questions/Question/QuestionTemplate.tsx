import React from 'react'
import ESQuestion from 'sanar-ui/dist/Components/Molecules/Question'
import { RMContainer } from '../../../Components/RMContainer'
import ESButton from 'sanar-ui/dist/Components/Atoms/Button'
import { QuestionPageType, useQuestionsContext } from '../QuestionsContext'
import { SessionStatusDashboard } from './SessionStatusDashboard'

interface IProps {
    onConfirm?: (alternativeId) => void
    onNext?: (correct) => void
    onJump?: (question) => void
    stats: any
    loading: boolean
}

export const QuestionTemplate = ({ onConfirm, onNext, onJump, stats, loading }: IProps) => {

    const {
        currentQuestion,
        currentAnswerId,
        isFromCourse,
        setCurrentPage
    } = useQuestionsContext()

    let expertComment
    if (currentQuestion) {
        expertComment = currentQuestion
            .comments
            .data
            .find(c => c.labels === 'expert')
    }

    return <RMContainer>
        <div style={
            {
                display: 'flex',
                alignItems: 'center',
                justifyContent: isFromCourse ? 'center' : 'space-between'
            }
        }>
            <SessionStatusDashboard/>

            {!isFromCourse && <ESButton
                color='primary'
                variant='text'
                blockOnlyMobile
                onClick={() => setCurrentPage(QuestionPageType.Filter)}
            >Ver filtros</ESButton>
            }
        </div>
        <ESQuestion
            loading={loading || !currentQuestion}
            question={currentQuestion}
            answer={currentAnswerId}
            stats={stats}
            comment={expertComment}
            onConfirm={onConfirm}
            onNext={onNext}
            onJump={onJump}
            onlyStep={true}
        />

    </RMContainer>

}
