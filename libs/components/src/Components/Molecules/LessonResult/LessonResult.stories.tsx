import React from 'react'
import { storiesOf } from '@storybook/react'

import SANLessonResult from './LessonResult'

const questions = [
    {
        id: '1',
        title: 'Titulo Titulo Titulo Titulo Titulo Titulo Titulo Titulo',
        corrects: 8,
        total: 10,
        quiz: {
            id: '1',
            questions: [
                {
                    id: '2'
                }
            ]
        }
    },
    {
        id: '2',
        title: 'Collection 02',
        corrects: 8,
        total: 10,
        quiz: {
            id: '1',
            questions: [
                {
                    id: '2'
                }
            ]
        }
    },
    {
        id: '3',
        title: 'Collection 03',
        corrects: 7,
        total: 10,
        quiz: {
            id: '1',
            questions: [
                {
                    id: '2'
                }
            ]
        }
    }
]

storiesOf('Molecules.LessonResult', module).add(
    'Simple',
    () => (
        <SANLessonResult
            onGoPractice={console.log}
            onGoQuiz={console.log}
            questions={questions}
        />
    ),
    {
        style: {
            background: '#242938',
            padding: 0
        }
    }
)
