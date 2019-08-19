import React from 'react'
import { storiesOf } from '@storybook/react'

import SANButton from './Button'

storiesOf('Atoms.Button', module).add('Simple', () => (
    <SANButton>Button</SANButton>
))
