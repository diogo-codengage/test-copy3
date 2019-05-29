
import React from 'react'
import { storiesOf } from '@storybook/react'
import ESI18nProvider from './I18nProvider'

storiesOf('Atoms.I18nProvider', module).add('Simple', () => (
    <ESI18nProvider />
))
