import React from 'react'
import { storiesOf } from '@storybook/react'
import { select } from '@storybook/addon-knobs'

import ESEvaIcon from './EvaIcon'

const sizeOptions = {
    Xsmall: 'xsmall',
    Small: 'small',
    Medium: 'medium',
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
        size={select('Size', sizeOptions, 'medium')}
        color={select('Color', colorOptions, 'default')}
    />
))
