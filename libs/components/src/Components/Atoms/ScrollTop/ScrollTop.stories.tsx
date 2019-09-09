import React from 'react'
import { storiesOf } from '@storybook/react'
import SANScrollTop from './ScrollTop'

import { BrowserRouter } from 'react-router-dom'

storiesOf('Atoms.ScrollTop', module).add('Simple', () => (
    <BrowserRouter>
        <SANScrollTop>
            <div
                style={{
                    minHeight: 1000,
                    backgroundColor: 'red'
                }}
            />
        </SANScrollTop>
    </BrowserRouter>
))
