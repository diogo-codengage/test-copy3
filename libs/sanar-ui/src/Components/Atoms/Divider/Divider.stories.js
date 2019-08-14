import React from 'react'
import { storiesOf } from '@storybook/react'
import ESDivider from './Divider'
import { select, text, boolean } from '@storybook/addon-knobs'

const types = {
    Horizontal: 'horizontal',
    Vertical: 'vertical'
}

const orientationTypes = {
    Center: 'center',
    Left: 'left',
    Right: 'right'
}

storiesOf('Atoms.Divider', module).add('Simple', () => (
    <ESDivider
        type={select('Type', types, 'horizontal')}
        dashed={boolean('Dashed', false)}
        orientation={select('Orientation', orientationTypes, 'center')}
    >
        {text('Children', 'With Text')}
    </ESDivider>
))
