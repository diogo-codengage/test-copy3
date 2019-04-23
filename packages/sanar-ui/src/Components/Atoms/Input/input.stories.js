import React from 'react'
import { storiesOf } from '@storybook/react'
import { select, text, boolean, number } from '@storybook/addon-knobs'

import Input from 'antd/lib/input'
import ESInput, { ESInputSearch, ESTextArea } from './'
import ESIcon from '../Icon'

const sizeOptions = {
    Default: 'default',
    Large: 'large',
    Small: 'small'
}

storiesOf('Atoms.Input', module)
    .add('Simple', () => (
        <ESInput
            disabled={boolean('Disabled', false)}
            placeholder={text('Placeholder', 'E-mail')}
            prefix={<ESIcon type='mail' />}
            size={select('Size', sizeOptions, 'default')}
            addonAfter={text('Addon after', 'addonAfter')}
            addonBefore={text('Addon before', 'addonBefore')}
            allowClear={boolean('Allow clear', false)}
        />
    ))
    .add('Password', () => (
        <ESInput
            placeholder={text('Placeholder', 'Senha')}
            component={Input.Password}
        />
    ))
    .add('Search', () => (
        <ESInputSearch
            placeholder={text('Placeholder', 'Busque seu conteúdo')}
            enterButton={text('Enter button', '')}
        />
    ))
    .add('Text Area', () => <ESTextArea />)
