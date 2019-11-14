import React from 'react'
import { storiesOf } from '@storybook/react'
import SANLessonResult from './LessonResult'

const questions = [
    {
        number: '1',
        title: 'Lorem ipsum dolor sit amet, consectetur adipiscing.',
        correctsQuizzes: 4,
        totalQuizzes: 5
    },
    {
        number: '2',
        title:
            'Sed scelerisque nulla eu lectus placerat dapibus. In sodales diam diam, eu sodales magna aliquet a.',
        correctsQuizzes: 4,
        totalQuizzes: 5
    },
    {
        number: '3',
        title:
            'Phasellus nec purus at nunc gravida pretium. Morbi dictum at augue ultricies malesuada.',
        correctsQuizzes: 1,
        totalQuizzes: 5
    },
    {
        number: '4',
        title:
            'Sed scelerisque arcu fermentum, semper turpis a, interdum justo. Donec tristique arcu dui, eu viverra neque pretium sit amet.',
        correctsQuizzes: 4,
        totalQuizzes: 5
    },
    {
        number: '5',
        title:
            'Interdum justo. Donec tristique arcu dui, eu viverra neque pretium sit amet.',
        correctsQuizzes: 4,
        totalQuizzes: 5
    }
]

function goPractice() {
    console.log('IR PARA A ÁREA DE PRÁTICA')
    return false
}

storiesOf('Molecules.LessonResult', module).add('Simple', () => (
    <SANLessonResult onGoPractice={() => goPractice()} questions={questions} />
))
