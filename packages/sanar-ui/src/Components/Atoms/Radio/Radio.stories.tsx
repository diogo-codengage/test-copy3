import React from 'react'
import { storiesOf } from '@storybook/react'
import ESRadio from './Radio'
import ESRadioButton from './Button'
import ESRadioGroup from './Group'

storiesOf('Atoms.Radio', module)
    .add('Simple', () => <ESRadio>Default</ESRadio>)
    .add('Button', () => <ESRadioButton>Default</ESRadioButton>)
    .add('Group', () => (
        <ESRadioGroup>
            <ESRadioButton value={1}>1</ESRadioButton>
            <ESRadioButton value={2}>2</ESRadioButton>
            <ESRadioButton value={3}>3</ESRadioButton>
        </ESRadioGroup>
    ))
