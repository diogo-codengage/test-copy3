import React from 'react'
import { storiesOf } from '@storybook/react'
import { select, boolean } from '@storybook/addon-knobs'

import ESCard from './Card'

const sizeOpetions = {
    Default: 'default',
    Small: 'small'
}

storiesOf('Atoms.Card', module).add('Simple', () => (
    <ESCard size={select('Size', sizeOpetions, 'small')} />
))
