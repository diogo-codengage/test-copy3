import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { boolean } from '@storybook/addon-knobs'

import ESTextEditor from './TextEditor'

storiesOf('Molecules.TextEditor', module).add('Simple', () => (
    <ESTextEditor
        comment={boolean('Comment', true)}
        onCancel={action('onCancel')}
        onSubmit={action('onSubmit')}
    />
))
