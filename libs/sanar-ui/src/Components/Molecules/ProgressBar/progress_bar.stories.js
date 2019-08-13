import React from 'react'
import { storiesOf } from '@storybook/react'
import { number } from '@storybook/addon-knobs'

import ESProgressBar from './'

storiesOf('Molecules.Progress bar', module).add('Simple', () => (
    <ESProgressBar percent={number('Percent', 30)} />
))
