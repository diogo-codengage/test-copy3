import React from 'react'
import ESQuestion from 'sanar-ui/dist/Components/Molecules/Question'
import { RMContainer } from '../../../Components/RMContainer'
import ESButton from 'sanar-ui/dist/Components/Atoms/Button'
import { QuestionPageType, useQuestionsContext } from '../QuestionsContext'
import { SessionStatusDashboard } from './SessionStatusDashboard'
import ESModal from 'sanar-ui/dist/Components/Atoms/Modal'

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
        setCurrentPage,
        course,
        noMoreQuestions,
        setNoMoreQuestion
    } = useQuestionsContext()

    const isFromCourse = () => {
        return !!course;
    }

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
                justifyContent: isFromCourse() ? 'center' : 'space-between'
            }
        }>
            <SessionStatusDashboard/>

            {!isFromCourse() && <ESButton
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
            labelMonitor={'Ninja Sanar'}
        />

        <ESModal
            title={'Opps'}
            visible={noMoreQuestions}
            centered
            onCancel={() => {
                setCurrentPage(QuestionPageType.Filter)
                setNoMoreQuestion(true)
            }}
        >
            <p> Não encontramos questões para você praticar, tente outras opções </p>

            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <ESButton
                    color='black'
                    variant='text'
                    uppercase
                    blockOnlyMobile
                    onClick={() => {
                       setCurrentPage(QuestionPageType.Filter)
                       setNoMoreQuestion(true)
                    }}
                >VOLTAR PARA FILTRO</ESButton>
            </div>
        </ESModal>
    </RMContainer>


}
