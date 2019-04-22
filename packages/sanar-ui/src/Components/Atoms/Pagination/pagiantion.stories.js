import React, { useState } from 'react'
import { storiesOf } from '@storybook/react'
import { number, select } from '@storybook/addon-knobs'

import ESPagination from './Pagination'

const sizeOptions = {
    Default: '',
    Small: 'small'
}

storiesOf('Atoms.Pagination', module).add('Simple', () => (
    <ESPagination
        current={number('Current', 6)}
        total={number('Total', 100)}
        size={select('Size', sizeOptions, '')}
    />
))
