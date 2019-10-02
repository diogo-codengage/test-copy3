import React from 'react'
import { storiesOf } from '@storybook/react'
import { text, boolean } from '@storybook/addon-knobs'

import SANGenericError from './GenericError'

storiesOf('Molecules.GenericError', module).add('Simple', () => (
    <SANGenericError
        message={text('Message', 'Message here')}
        dark={boolean('Dark', false)}
    />
))
