import React from 'react'
import { storiesOf } from '@storybook/react'
import { text } from '@storybook/addon-knobs'
import SANLessonResult from './LessonResult'

const questions = [
    {
        number: '1',
        title: '1',
        percentToCorrect: 80,
        correctsQuizzes: 3,
        totalQuizzes: 5
    },
    {
        number: '2',
        title: '2',
        percentToCorrect: 80,
        correctsQuizzes: 3,
        totalQuizzes: 5
    },
    {
        number: '3',
        title: '3',
        percentToCorrect: 80,
        correctsQuizzes: 1,
        totalQuizzes: 5
    }
]

storiesOf('Molecules.LessonResult', module).add('Simple', () => (
    <SANLessonResult
        totalQuestions={5}
        correctsQuestions={3}
        percentToCorrect={80}
        onGoPractice={() => false}
        questions={questions}
        />
))
