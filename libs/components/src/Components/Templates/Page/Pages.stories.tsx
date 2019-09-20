import React from 'react'
import { storiesOf } from '@storybook/react'

import SANPage from './Page'

storiesOf('Templates.Page', module).add(
    'Simple',
    () => (
        <SANPage
            hasContainer
            BoxProps={{
                bg: 'primary',
                flex: '1',
                py: '8'
            }}
            HeaderProps={{
                onBack: () => console.log('onBack'),
                SessionTitleProps: {
                    title: 'Page title'
                }
            }}
        >
            Content
        </SANPage>
    ),
    {
        style: {
            height: '100vh',
            display: 'flex',
            flexDirection: 'column'
        }
    }
)
