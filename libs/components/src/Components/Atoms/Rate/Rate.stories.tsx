import React from 'react'
import { storiesOf } from '@storybook/react'
import { boolean, number } from '@storybook/addon-knobs'

import SANRate from './Rate'

storiesOf('Atoms.Rate', module).add('Simple', () => (
    <SANRate
        allowHalf={boolean('Allow half', true)}
        count={number('Count', 5)}
        allowClear={boolean('Allow clear', true)}
        disabled={boolean('Disabled', false)}
        defaultValue={3}
    />
))
