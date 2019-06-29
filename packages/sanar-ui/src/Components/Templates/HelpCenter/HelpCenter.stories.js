import React from 'react'
import { storiesOf } from '@storybook/react'
import ESHelpCenterTemplate from './HelpCenter'

storiesOf('Templates.HelpCenter', module).add(
    'Simple',
    () => <ESHelpCenterTemplate />,
    {
        style: {
            padding: 0,
            height: '100vh'
        }
    }
)
