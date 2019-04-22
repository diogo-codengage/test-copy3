import React from 'react'
import { storiesOf } from '@storybook/react'
import { select, text, boolean } from '@storybook/addon-knobs'

import ESSwitch from './Switch'

const sizeOpetions = {
    Default: 'default',
    Small: 'small'
}

storiesOf('Atoms.Switch', module).add('Simple', () => (
    <ESSwitch
        disabled={boolean('Disabled', false)}
        loading={boolean('Loading', false)}
        size={select('Size', sizeOpetions, 'default')}
    />
))
