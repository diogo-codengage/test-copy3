import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import ESTextEditor from './TextEditor'

storiesOf('Molecules.TextEditor', module).add('Simple', () => (
    <ESTextEditor onCancel={action('onCancel')} onSubmit={action('onSubmit')} />
))
