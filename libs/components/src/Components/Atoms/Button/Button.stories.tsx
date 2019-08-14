import React from 'react'
import { storiesOf } from '@storybook/react'

import SANButton from './Button'

storiesOf('Molecules.Button', module).add('Simple', () => (
    <SANButton>Button</SANButton>
))
