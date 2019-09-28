import React from 'react'
import { storiesOf } from '@storybook/react'
import SANError500 from './Error500'

storiesOf('Page.Error500', module).add(
    'Simple',
    () => <SANError500 onClick={console.log} />,
    {
        style: {
            padding: 0,
            height: '100vh'
        }
    }
)
