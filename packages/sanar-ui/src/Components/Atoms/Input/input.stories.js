import React from 'react'
import { storiesOf } from '@storybook/react'
import { select, text, boolean } from '@storybook/addon-knobs'

import ESInput, { ESInputSearch, ESTextArea } from './'
import { SInput } from './SInput'
import ESEvaIcon from '../EvaIcon'
import ESIcon from '../Icon'

const sizeOptions = {
    Default: 'default',
    Large: 'large',
    Small: 'small'
}

const sizeSOptions = {
    Large: 'large',
    Medium: 'medium',
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
            component={ESInput.Password}
        />
    ))
    .add('Search', () => (
        <ESInputSearch
            placeholder={text('Placeholder', 'Busque seu conteúdo')}
            enterButton={text('Enter button', '')}
        />
    ))
    .add('Text Area', () => <ESTextArea />)
    .add('Styled', () => (
        <SInput
            disabled={boolean('Disabled', false)}
            placeholder={text('Placeholder', 'Placeholder')}
            iconLeft={<ESEvaIcon name='alert-circle-outline' />}
            iconRight={<ESEvaIcon name='alert-circle-outline' />}
            size={select('Size', sizeSOptions, 'large')}
            required={boolean('Required', false)}
            round={boolean('Round', false)}
        />
    ))
