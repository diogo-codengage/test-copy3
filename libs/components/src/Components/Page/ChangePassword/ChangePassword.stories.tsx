import React from 'react'
import { storiesOf } from '@storybook/react'
import SANChangePassword from './ChangePassword'

storiesOf('Page.ChangePassword', module).add(
    'Simple',
    () => <SANChangePassword />,
    {
        style: {
            padding: 0,
            height: '100vh'
        }
    }
)
