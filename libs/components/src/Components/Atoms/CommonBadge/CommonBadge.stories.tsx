import React from 'react'
import { storiesOf } from '@storybook/react'
import SANCommonBadge from './CommonBadge'

import { number, text, select } from '@storybook/addon-knobs'

const statusOptions = {
    Default: 'default',
    Primary: 'primary',
    Secondary: 'secondary',
    Success: 'success',
    Warning: 'warning',
    Info: 'info',
    Error: 'error'
}

storiesOf('Atoms.CommonBadge', module).add('Simple', () => (
    <SANCommonBadge
        fontSize={number('Font size', 10)}
        count={number('Count', 45)}
        suffix={text('Suffix', '%')}
        status={select('Status', statusOptions, 'default')}
    />
))
