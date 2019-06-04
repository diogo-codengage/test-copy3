import React from 'react'
import ESQuestionList from './List/QuestionList'
import { ESQuestionHeader } from './Header'
import ESTypography from 'sanar-ui/dist/Components/Atoms/Typography'
import ESButton from 'sanar-ui/dist/Components/Atoms/Button'
import './style.less'

const Title = ({ questionNumber, total }) => (
    <ESTypography level={4}>
        Questão {questionNumber}
        <ESTypography variant='body2'>/ {total} +</ESTypography>
    </ESTypography>
)

const Extras = ({ onClick }) => (
    <div>
        <ESButton
            size='xsmall'
            color='primary'
            variant='solid'
            uppercase
            bold
            onClick={onClick}
        >
            Encerrar prática
        </ESButton>
    </div>
)

const SanQuestionListPage = ({ question }) => {
    return (
        <div className='questions'>
            <ESQuestionHeader
                title={
                    <Title
                        questionNumber={question.number}
                        total={question.total}
                    />
                }
                extras={
                    <Extras onClick={() => console.log('Clicou no extra')} />
                }
            />
            <ESQuestionList />
        </div>
    )
}

export default SanQuestionListPage
