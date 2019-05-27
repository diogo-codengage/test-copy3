import React from 'react'
import { storiesOf } from '@storybook/react'
import ESAuthTemplate from './Auth'

storiesOf('Templates.Auth', module).add('Simple', () => <ESAuthTemplate />, {
    style: {
        padding: 0,
        height: '100vh'
    }
})
