import React from 'react'
import { storiesOf } from '@storybook/react'
import { number, text, select } from '@storybook/addon-knobs'

import ESCommonBadge from './CommonBadge'

const statusOptions = {
    Default: 'default',
    Primary: 'primary',
    Secondary: 'secondary',
    Success: 'success',
    Warning: 'warning',
    Info: 'info',
    Error: 'error'
}

storiesOf('Atoms.Common badge', module).add('Simple', () => (
    <ESCommonBadge
        fontSize={number('Font size', 10)}
        count={number('Count', 45)}
        suffix={text('Suffix', '%')}
        status={select('Status', statusOptions, 'default')}
    />
))
