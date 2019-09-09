import React from 'react'
import { storiesOf } from '@storybook/react'

import { text } from '@storybook/addon-knobs'

import SANDivider from './Divider'

storiesOf('Atoms.Divider', module).add('Simple', () => (
    <SANDivider backgroundColor={text('Background color', 'red')} />
))
