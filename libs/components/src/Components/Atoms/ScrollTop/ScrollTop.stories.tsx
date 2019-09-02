import React from 'react'
import { storiesOf } from '@storybook/react'
import SANScrollTop from './ScrollTop'

storiesOf('Atoms.ScrollTop', module).add('Simple', () => (
    <SANScrollTop>
        <div
            style={{
                minHeight: 1000,
                backgroundColor: 'red'
            }}
        />
    </SANScrollTop>
))
