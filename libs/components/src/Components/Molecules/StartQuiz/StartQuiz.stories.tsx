import React from 'react'
import { storiesOf } from '@storybook/react'

import SANStartQuiz from './StartQuiz'

storiesOf('Molecules.StartQuiz', module).add('Simple', () => (
    <SANStartQuiz name='Diogo Biz' />
))
