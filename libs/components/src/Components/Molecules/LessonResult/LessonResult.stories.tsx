import React from 'react'
import { storiesOf } from '@storybook/react'
import SANLessonResult from './LessonResult'

import { number } from '@storybook/addon-knobs'

function goPractice() {
    console.log('IR PARA A ÁREA DE PRÁTICA')
    return false
}

storiesOf('Molecules.LessonResult', module).add('Simple', () => (
    <SANLessonResult
        onGoPractice={() => goPractice()}
        percentToCorrect={number('Porcentagem para estar correto', 80)}
        questions={[
            {
                number: '1',
                title: 'Lorem ipsum dolor sit amet, consectetur adipiscing.',
                correctsQuizzes: number('Quiz 1 questões corretas:', 4),
                totalQuizzes: 5
            },
            {
                number: '2',
                title:
                    'Sed scelerisque nulla eu lectus placerat dapibus. In sodales diam diam, eu sodales magna aliquet a.',
                correctsQuizzes: number('Quiz 2 questões corretas:', 4),
                totalQuizzes: 5
            },
            {
                number: '3',
                title:
                    'Phasellus nec purus at nunc gravida pretium. Morbi dictum at augue ultricies malesuada.',
                correctsQuizzes: number('Quiz 3 questões corretas:', 1),
                totalQuizzes: 5
            },
            {
                number: '4',
                title:
                    'Sed scelerisque arcu fermentum, semper turpis a, interdum justo. Donec tristique arcu dui, eu viverra neque pretium sit amet.',
                correctsQuizzes: number('Quiz 4 questões corretas:', 4),
                totalQuizzes: 5
            },
            {
                number: '5',
                title:
                    'Interdum justo. Donec tristique arcu dui, eu viverra neque pretium sit amet.',
                correctsQuizzes: number('Quiz 5 questões corretas:', 4),
                totalQuizzes: 5
            }
        ]}
    />
))
