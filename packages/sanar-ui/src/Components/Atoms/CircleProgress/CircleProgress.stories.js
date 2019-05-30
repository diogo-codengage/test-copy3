import React from 'react'
import { storiesOf } from '@storybook/react'
import { number, select, boolean, text } from '@storybook/addon-knobs'

import ESCircleProgress from './CircleProgress'

const statusOptions = {
    Default: '',
    Success: 'success',
    Warning: 'warning',
    Exception: 'exception',
    Active: 'active',
    Normal: 'normal'
}

storiesOf('Atoms.CircleProgress', module).add('Simple', () => (
    <ESCircleProgress
        percent={number('Percent', 50)}
        format={percent => text('Format', `${percent}%`)}
        showInfo={boolean('Show info', true)}
        status={select('Status', statusOptions)}
        width={number('Width', 44)}
        successPercent={number('Success percent', 30)}
        strokeWidth={number('Stroke width', 6)}
    />
))
