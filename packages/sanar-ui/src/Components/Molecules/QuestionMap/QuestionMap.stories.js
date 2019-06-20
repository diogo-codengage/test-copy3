import React from 'react'
import { storiesOf } from '@storybook/react'
import { boolean } from '@storybook/addon-knobs'

import ESQuestionMap from './QuestionMap'

const quiz = [
    {
        index: 1,
        status: 'correct'
    },
    {
        index: 2,
        status: 'correct'
    },
    {
        index: 3,
        status: 'wrong'
    },
    {
        index: 4
    },
    {
        index: 5
    }
]

const mock = [
    {
        index: 1,
        status: 'correct'
    },
    {
        index: 2,
        status: 'correct'
    },
    {
        index: 3,
        status: 'wrong'
    },
    {
        index: 4
    },
    {
        index: 5
    },
    {
        index: 6,
        status: 'correct'
    },
    {
        index: 7,
        status: 'correct'
    },
    {
        index: 8,
        status: 'correct'
    },
    {
        index: 9,
        status: 'correct'
    },
    {
        index: 10,
        status: 'correct'
    },
    {
        index: 11,
        status: 'correct'
    },
    {
        index: 12
    },
    {
        index: 13
    },
    {
        index: 14
    },
    {
        index: 15
    }
]

storiesOf('Molecules.QuestionMap', module)
    .add('Quiz', () => (
        <ESQuestionMap
            visible={boolean('Visible', true)}
            items={quiz}
            current={4}
        />
    ))
    .add('Mock', () => (
        <ESQuestionMap
            visible={boolean('Visible', true)}
            items={mock}
            mock
            current={5}
        />
    ))
