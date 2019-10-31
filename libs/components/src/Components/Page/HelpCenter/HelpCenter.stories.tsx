import React from 'react'
import { storiesOf } from '@storybook/react'

import SANHelpCenter from './HelpCenter'

import data from './data'

storiesOf('Page.HelpCenter', module).add(
    'Simple',
    () => <SANHelpCenter data={data} onBack={console.log} />,
    {
        style: {
            padding: 0,
            height: '100%'
        }
    }
)
