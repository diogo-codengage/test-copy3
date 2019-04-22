import React from 'react'
import { storiesOf } from '@storybook/react'
import { boolean, text } from '@storybook/addon-knobs'

import ESModal from './Modal'

storiesOf('Atoms.Modal', module).add('Simple', () => (
    <ESModal
        title={text('Title', 'Basic Modal')}
        visible={boolean('Visible', false)}
        centered={boolean('Centered', true)}
    >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
    </ESModal>
))
