import React from 'react'
import { storiesOf } from '@storybook/react'
import { number, boolean, text, select } from '@storybook/addon-knobs'

import ESBadge from './Badge'

const statusOptions = {
    '': '',
    Success: 'success',
    Processing: 'processing',
    Default: 'default',
    Error: 'error',
    Warning: 'warning'
}

storiesOf('Atoms.Badge', module).add('Simple', () => (
    <ESBadge
        count={number('Count', 5)}
        dot={boolean('Dot', false)}
        text={text('Text', '')}
        status={select('Status', statusOptions, '')}
    />
))
