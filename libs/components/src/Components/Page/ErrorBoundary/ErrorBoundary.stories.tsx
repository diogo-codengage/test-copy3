import React from 'react'
import { storiesOf } from '@storybook/react'

import SANErrorBoundary from './ErrorBoundary'

storiesOf('Page.ErrorBoundary', module).add('Simple', () => (
    <SANErrorBoundary onClick={console.log}>
        <p>content</p>
    </SANErrorBoundary>
))
