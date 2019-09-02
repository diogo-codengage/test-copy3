import React from 'react'
import { storiesOf } from '@storybook/react'
import SANBadge from './Badge'

import { number, boolean, text, select } from '@storybook/addon-knobs'

const statusOptions = {
    '': '',
    Success: 'success',
    Processing: 'processing',
    Default: 'default',
    Error: 'error',
    Warning: 'warning'
}

storiesOf('Atoms.Badge', module).add('Simple', () => (
    <SANBadge
        count={number('Count', 5)}
        dot={boolean('Dot', false)}
        border={boolean('Border', true)}
        solid={boolean('Solid', false)}
        text={text('Text', '')}
        status={select('Status', statusOptions, '')}
    />
))
