import React from 'react'
import { storiesOf } from '@storybook/react'
import { number } from '@storybook/addon-knobs'

import SANLessonResult from './LessonResult'

const questions = [
    {
        title: 'Titulo Titulo Titulo Titulo Titulo Titulo Titulo Titulo',
        corrects: 8,
        total: 10
    },
    {
        title: 'Collection 02',
        corrects: 8,
        total: 10
    },
    {
        title: 'Collection 03',
        corrects: number('Corrects', 7),
        total: 10
    }
]

storiesOf('Molecules.LessonResult', module).add(
    'Simple',
    () => <SANLessonResult onGoPractice={console.log} questions={questions} />,
    {
        style: {
            background: '#242938',
            padding: 0
        }
    }
)
