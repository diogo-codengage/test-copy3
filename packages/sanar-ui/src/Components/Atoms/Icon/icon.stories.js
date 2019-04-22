import React from 'react'
import { storiesOf } from '@storybook/react'
import { select, color, boolean, number } from '@storybook/addon-knobs'

import ESIcon from './Icon'

const themeOptions = {
    Outlined: 'outlined',
    Filled: 'filled',
    TwoTone: 'twoTone'
}

storiesOf('Atoms.Icon', module).add('Simple', () => (
    <ESIcon
        type='home'
        fontSize={number('Font size', 25)}
        rotate={number('Rotate', 0)}
        spin={boolean('Spin', false)}
        theme={select('Theme', themeOptions, 'outlined')}
        twoToneColor={color('Color', '#000')}
    />
))
