import React from 'react'
import { storiesOf } from '@storybook/react'
import { number, select, boolean, text } from '@storybook/addon-knobs'

import ESCircleProgress from './CircleProgress'

const statusOptions = {
    Error: 'error',
    Success: 'success',
    Normal: 'normal'
}

const StrokeLinecap = {
    Round: 'round',
    Square: 'square'
}

storiesOf('Atoms.CircleProgress', module).add('Simple', () => (
    <ESCircleProgress
        percent={number('Percent', 50)}
        format={percent => text('Format', `${percent}%`)}
        showInfo={boolean('Show info', true)}
        status={select('Status', statusOptions, 'normal')}
        strokeLinecap={select('Stroke Linecap', StrokeLinecap, 'square')}
        width={number('Width', 120)}
        strokeWidth={number('Stroke width', 6)}
    />
))
