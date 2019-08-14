import React from 'react'
import { storiesOf } from '@storybook/react'
import { select, text, boolean } from '@storybook/addon-knobs'

import ESDatePicker from './DatePicker'

const modeOptions = {
    Date: 'date',
    Time: 'time',
    Month: 'month',
    Year: 'year',
    Decade: 'decade'
}

const sizeOptions = {
    '': '',
    Small: 'small',
    Large: 'large'
}

storiesOf('Atoms.DatePicker', module).add('Simple', () => (
    <ESDatePicker
        mode={select('Mode', modeOptions, 'year')}
        disabled={boolean('Disabled', false)}
        placeholder={text('Placeholder', 'Select date')}
        showTime={boolean('Show time', false)}
        showToday={boolean('Show today', true)}
        size={select('Size', sizeOptions, '')}
    />
))
