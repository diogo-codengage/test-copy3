import React from 'react'
import { storiesOf } from '@storybook/react'
import ESProgress from './Progress'

import { boolean, select, number } from '@storybook/addon-knobs'

const statusOptions = {
    Default: '',
    Success: 'success',
    Warning: 'warning',
    Exception: 'exception',
    Active: 'active',
    Normal: 'normal'
}

const sizeOptions = {
    Default: '',
    Small: 'small',
    Medium: 'medium',
    Large: 'large'
}

storiesOf('Atoms.Progress', module).add('Simple', () => (
    <ESProgress
        percent={number('Percent', 50)}
        goal={number('Goal', 50)}
        square={boolean('Square', false)}
        showInfo={boolean('Show info', false)}
        status={select('Status', statusOptions)}
        size={select('Size', sizeOptions)}
    />
))
