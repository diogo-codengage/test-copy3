import React from 'react'
import { storiesOf } from '@storybook/react'
import ESThemeProvider from './ThemeProvider'

storiesOf('Atoms.ThemeProvider', module).add('Simple', () => (
    <ESThemeProvider theme={{}} />
))
