import React from 'react'
import { storiesOf } from '@storybook/react'
import { boolean, text, number } from '@storybook/addon-knobs'

import SANTextArea from './TextArea'

storiesOf('Atoms.TextArea', module).add('Simple', () => (
    <SANTextArea
        ref={console.log}
        rows={number('Rows', 3)}
        placeholder={text('Placeholder', 'Escreva algo')}
        disabled={boolean('Disabled', false)}
    />
))
