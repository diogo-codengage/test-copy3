import React from 'react'
import ESTypography from 'sanar-ui/dist/Components/Atoms/Typography'
import ESButton from 'sanar-ui/dist/Components/Atoms/Button'
import { ESQuestionHeader } from '../Header'
import PropTypes from 'prop-types'
import { ESAlternative } from 'sanar-ui/dist/Components/Atoms/Question/Alternative'
import { ESRow, ESCol } from 'sanar-ui/dist/Components/Atoms/Grid'
import { SANPortalPagesContainer } from 'Pages/Portal/Layout'

const Title = ({ questionNumber, total }) => (
    <ESTypography level={4}>
        Questão {questionNumber}
        <ESTypography variant='body2'>/ {total} +</ESTypography>
    </ESTypography>
)

const Extras = ({ onClick }) => (
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
)

const question = {
    number: 1212,
    total: 1999
}

const ESQuestionDetailsPage = () => (
    <div className='san-questions-details'>
        <ESQuestionHeader
            title={
                <Title
                    questionNumber={question.number}
                    total={question.total}
                />
            }
            extra={<Extras onClick={() => console.log('Clicou no extra')} />}
        />
        <SANPortalPagesContainer>
            <ESAlternative
                situation='correct'
                answer='A'
                value='aushauhuehaueh'
            />
        </SANPortalPagesContainer>
    </div>
)

ESQuestionDetailsPage.propTypes = {
    question: PropTypes.any
}

export default ESQuestionDetailsPage
