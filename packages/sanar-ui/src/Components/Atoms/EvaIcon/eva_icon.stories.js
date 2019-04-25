import React from 'react'
import { storiesOf } from '@storybook/react'
import { select, color } from '@storybook/addon-knobs'

import ESEvaIcon from './EvaIcon'

const sizeOptions = {
    Medium: 'medium',
    Small: 'small',
    Large: 'large',
    Xlarge: 'xlarge'
}

const colorOptions = {
    Default: 'default',
    Primary: 'primary',
    Secondary: 'secondary',
    Success: 'success',
    Warning: 'warning',
    Info: 'info',
    Error: 'error'
}

storiesOf('Atoms.Eva icon', module).add('Simple', () => (
    <ESEvaIcon
        name='award-outline'
        size={select('Size', sizeOptions, 'small')}
        color={select('Color', colorOptions, 'default')}
    />
))
