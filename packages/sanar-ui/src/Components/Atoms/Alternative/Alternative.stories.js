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
            answer='A'
            value={alternativeText}
            striped={striped}
            onStripeClicked={() => console.log('onStripeClicked')}
        />
    ))
    .add('Correct', () => (
        <ESAlternative
            situation='correct'
            answer='A'
            value={alternativeText}
            striped={true}
        />
    ))
    .add('Wrong', () => (
        <ESAlternative situation='wrong' answer='A' value={alternativeText} />
    ))
    .add('Selected', () => (
        <ESAlternative
            situation='selected'
            answer='A'
            value={alternativeText}
        />
    ))
    .add('Missed', () => (
        <ESAlternative situation='missed' answer='A' value={alternativeText} />
    ))
