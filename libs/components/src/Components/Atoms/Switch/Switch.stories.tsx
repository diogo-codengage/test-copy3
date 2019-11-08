import React from 'react'
import { storiesOf } from '@storybook/react'
import { select, boolean } from '@storybook/addon-knobs'

import SANSwitch from './Switch'

const sizeOpetions = {
    Default: 'default',
    Small: 'small'
}

storiesOf('Atoms.Switch', module).add('Simple', () => (
    <SANSwitch
        disabled={boolean('Disabled', false)}
        loading={boolean('Loading', false)}
        size={select('Size', sizeOpetions, 'default')}
    />
))
