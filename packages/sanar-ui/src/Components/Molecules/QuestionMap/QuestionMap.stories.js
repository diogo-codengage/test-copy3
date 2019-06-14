import React from 'react'
import { storiesOf } from '@storybook/react'
import { boolean } from '@storybook/addon-knobs'

import ESQuestionMap from './QuestionMap'

const map = [
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
        index: 4,
        status: 'current'
    },
    {
        index: 5
    }
]

storiesOf('Molecules.QuestionMap', module).add('Simple', () => (
    <ESQuestionMap visible={boolean('Visible', true)} />
))
