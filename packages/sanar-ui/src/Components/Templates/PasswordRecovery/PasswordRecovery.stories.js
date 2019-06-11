import React from 'react'
import { storiesOf } from '@storybook/react'
import ESPasswordRecoveryTemplate from './PasswordRecovery'

storiesOf('Templates.PasswordRecovery', module).add(
    'Simple',
    () => <ESPasswordRecoveryTemplate />,
    {
        style: {
            padding: 0,
            height: '100vh'
        }
    }
)
