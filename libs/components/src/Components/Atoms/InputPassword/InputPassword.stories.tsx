import React from 'react'
import { storiesOf } from '@storybook/react'
import { boolean, text, select } from '@storybook/addon-knobs'

import SANInputPassword from './InputPassword'

const sizeSOptions = {
    Large: 'large',
    Medium: 'medium',
    Small: 'small'
}

storiesOf('Atoms.InputPassword', module).add('Simple', () => (
    <SANInputPassword
        disabled={boolean('Disabled', false)}
        placeholder={text('Placeholder', 'Placeholder')}
        size={select('Size', sizeSOptions, 'large')}
        required={boolean('Required', false)}
        round={boolean('Round', false)}
    />
))
