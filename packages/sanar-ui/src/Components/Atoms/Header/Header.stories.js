import React from 'react'
import { storiesOf } from '@storybook/react'
import ESQuestionHeader from './Header'
import ESButton from '../Button'

const QuestionExtras = ({ onClick }) => (
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
    number: 1,
    total: 999
}

const questionExtra = [
    {
        size: 'xsmall',
        color: 'primary',
        variant: 'solid',
        uppercase: true,
        bold: true,
        title: 'Iniciar prática',
        onClick: () => alert('You clicked on this action!')
    }
]

const questionListExtra = [
    {
        size: 'xsmall',
        color: 'secondary',
        variant: 'text',
        uppercase: true,
        bold: false,
        title: 'Iniciar prática',
        onClick: () => alert('You clicked on this action!')
    },
    {
        size: 'xsmall',
        color: 'primary',
        variant: 'solid',
        uppercase: true,
        bold: false,
        title: 'Histórico de questões',
        onClick: () => alert('You clicked on this action!')
    }
]

/**
 * Exemplo de titulo da questão
 */
storiesOf('Atoms.QuestionHeader', module).add('Question', () => (
    <ESQuestionHeader
        title={`Questão ${question.number}`}
        extraTitle={` / ${question.total}`}
        actions={questionExtra}
    />
))

storiesOf('Atoms.QuestionListHeader', module).add('QuestionList', () => (
    <ESQuestionHeader
        title='Banco de questões'
        subtitle='Hora de praticar tudo o que você aprendeu no curso'
        actions={questionListExtra}
    />
))
