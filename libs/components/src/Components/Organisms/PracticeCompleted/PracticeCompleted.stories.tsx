import React from 'react'
import { storiesOf } from '@storybook/react'
import SANPracticeCompleted from './PracticeCompleted'

import { object } from '@storybook/addon-knobs'

const values = {
    correct: 30,
    wrong: 50,
    skipped: 20,
    sawQuestions: 50,
    elapsedTime: '30:00',
    averageQuestionTime: '00:10'
}

storiesOf('Organisms.PracticeCompleted', module).add(
    'Simple',
    () => <SANPracticeCompleted values={object('Values', values)} />,
    {
        style: {
            padding: 16,
            height: '100vh'
        }
    }
)
