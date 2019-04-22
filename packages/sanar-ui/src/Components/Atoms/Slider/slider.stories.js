import React from 'react'
import { storiesOf } from '@storybook/react'
import { select, number, boolean } from '@storybook/addon-knobs'

import ESSlider from './Slider'

const marks = {
    0: 'Aleatório',
    33: 'Fácil',
    66: 'Médio',
    100: 'Difícil'
}

storiesOf('Atoms.Slider', module).add('Simple', () => (
    <ESSlider
        marks={marks}
        defaultValue={number('Default value', 0)}
        vertical={boolean('Vertical', false)}
        disabled={boolean('Disabled', false)}
        dots={boolean('Dots', false)}
    />
))
