import React from 'react'
import { storiesOf } from '@storybook/react'
import { boolean } from '@storybook/addon-knobs'

import SANQuestionMap from './QuestionMap'

const quiz = [
    {
        index: 0,
        status: 'correct'
    },
    {
        index: 1,
        status: 'correct'
    },
    {
        index: 2,
        status: 'wrong'
    },
    {
        index: 3
    },
    {
        index: 4
    }
]

const mock = [
    {
        index: 0,
        status: 'correct'
    },
    {
        index: 1,
        status: 'correct'
    },
    {
        index: 2,
        status: 'wrong'
    },
    {
        index: 3
    },
    {
        index: 4
    },
    {
        index: 5,
        status: 'correct'
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
        index: 11
    },
    {
        index: 12
    },
    {
        index: 13
    },
    {
        index: 14
    }
]

storiesOf('Molecules.QuestionMap', module)
    .add('Quiz', () => (
        <SANQuestionMap
            visible={boolean('Visible', true)}
            items={quiz}
            current={4}
        />
    ))
    .add('Mock', () => (
        <SANQuestionMap
            visible={boolean('Visible', true)}
            items={mock}
            mock
            current={5}
        />
    ))
