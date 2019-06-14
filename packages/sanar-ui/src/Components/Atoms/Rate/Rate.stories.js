import React from 'react'
import { storiesOf } from '@storybook/react'
import { boolean, number } from '@storybook/addon-knobs'

import ESRate from './Rate'

storiesOf('Atoms.Rate', module).add(
    'Simple',
    () => (
        <ESRate
            allowHalf={boolean('Allow half', true)}
            count={number('Count', 5)}
            allowClear={boolean('Allow clear', true)}
            disabled={boolean('Disabled', false)}
            defaultValue={3}
        />
    ),
    {
        style: {
            backgroundColor: 'rgba(17, 19, 23, 0.75)',
            padding: 20,
            minHeight: 200
        }
    }
)
