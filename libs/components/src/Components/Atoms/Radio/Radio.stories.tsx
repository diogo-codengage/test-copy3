import React from 'react'
import { storiesOf } from '@storybook/react'
import { boolean } from '@storybook/addon-knobs'

import SANRadio from './Radio'
import SANRadioButton from './Button'
import SANRadioGroup from './Group'

storiesOf('Atoms.Radio', module)
    .add('Simple', () => <SANRadio>Default</SANRadio>)
    .add('Button', () => <SANRadioButton>Default</SANRadioButton>)
    .add('Group', () => (
        <SANRadioGroup blocks={boolean('Blocks', false)}>
            <SANRadioButton value={1}>Todos</SANRadioButton>
            <SANRadioButton value={2}>Concluídos</SANRadioButton>
            <SANRadioButton value={3}>Incompletos</SANRadioButton>
        </SANRadioGroup>
    ))
