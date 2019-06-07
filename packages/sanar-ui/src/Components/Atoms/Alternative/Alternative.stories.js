import React from 'react'
import { storiesOf } from '@storybook/react'
import ESAlternative from './Alternative'

const alternativeText =
    'In consequat, quam id sodales hendrerit, eros mi molestie leo, nec lacinia risus neque tristique augue.'

let striped = true

storiesOf('Atoms.Alternative', module)
    .add('Unselected', () => (
        <ESAlternative
            situation='none'
            id='id-alternative-1'
            text={alternativeText}
            index={0}
        />
    ))
    .add('Selected', () => (
        <ESAlternative
            selected='id-alternative-1'
            id='id-alternative-1'
            text={alternativeText}
            index={0}
        />
    ))
    .add('Correct', () => (
        <ESAlternative
            selected='id-alternative-1'
            correctAnswer='id-alternative-1'
            id='id-alternative-1'
            text={alternativeText}
            index={0}
        />
    ))
    .add('Wrong', () => (
        <ESAlternative
            selected='id-alternative-2'
            correctAnswer='id-alternative-1'
            id='id-alternative-2'
            text={alternativeText}
            index={0}
        />
    ))
    .add('Missed', () => (
        <ESAlternative
            selected='id-alternative-2'
            correctAnswer='id-alternative-1'
            id='id-alternative-3'
            text={alternativeText}
            index={0}
        />
    ))
