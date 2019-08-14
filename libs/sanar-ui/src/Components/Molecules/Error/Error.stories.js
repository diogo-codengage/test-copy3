import React from 'react'
import { storiesOf } from '@storybook/react'
import { text, boolean } from '@storybook/addon-knobs'

import SANErrorPiece from './Error'

storiesOf('Molecules.Error', module).add('Simple', () => (
    <SANErrorPiece
        message={text('Message', 'Message here')}
        dark={boolean('Dark', false)}
    />
))
