import React from 'react'
import { storiesOf } from '@storybook/react'
import { select } from '@storybook/addon-knobs'

import ESAlternative from './Alternative'

const alternativeText =
    'In consequat, quam id sodales hendrerit, eros mi molestie leo, nec lacinia risus neque tristique augue.'

const statusOptions = {
    normal: 'normal',
    selected: 'selected',
    correct: 'correct',
    incorrect: 'incorrect',
    ['correct-when-miss']: 'correct-when-miss',
    ['incorrect-when-miss']: 'incorrect-when-miss'
}

storiesOf('Atoms.Alternative', module).add('Unselected', () => (
    <ESAlternative
        status={select('Status', statusOptions, 'normal')}
        text={alternativeText}
        index={0}
    />
))
