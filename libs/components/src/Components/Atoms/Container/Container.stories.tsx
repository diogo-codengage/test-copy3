import React from 'react'
import { storiesOf } from '@storybook/react'

import SANContainer from './Container'

storiesOf('Molecules.Container', module).add('Simple', () => (
    <SANContainer>Button</SANContainer>
))
