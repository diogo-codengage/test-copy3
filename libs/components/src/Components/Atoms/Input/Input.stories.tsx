import React from 'react'
import { storiesOf } from '@storybook/react'
import { boolean, text, select } from '@storybook/addon-knobs'

import SANInput from './Input'

const sizeSOptions = {
    Large: 'large',
    Medium: 'medium',
    Small: 'small'
}

storiesOf('Atoms.Input', module).add('Simple', () => (
    <SANInput
        disabled={boolean('Disabled', false)}
        placeholder={text('Placeholder', 'Placeholder')}
        iconLeft='alert-circle-outline'
        iconRight='alert-circle-outline'
        size={select('Size', sizeSOptions, 'large')}
        required={boolean('Required', false)}
        round={boolean('Round', false)}
    />
))
