
import React from 'react'
import { storiesOf } from '@storybook/react'
import ESErrorBoundary from './ErrorBoundary'

storiesOf('Templates.ErrorBoundary', module).add('Simple', () => (
    <ESErrorBoundary />
))
