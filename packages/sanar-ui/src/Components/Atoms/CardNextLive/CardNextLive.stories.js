import React from 'react'
import { storiesOf } from '@storybook/react'
import { text } from '@storybook/addon-knobs'

import ESCardNextLive from './CardNextLive'
import ESButton from '../Button'
import ESEvaIcon from '../EvaIcon'

const actions = [
    <ESButton fontSize={12} clear ghost type='primary'>
        <ESEvaIcon size='small' name='bell' color='primary' /> Lembrado
    </ESButton>,
    <ESButton fontSize={12} clear ghost type='primary'>
        Ver live
        <ESEvaIcon
            size='small'
            name='diagonal-arrow-right-up'
            color='primary'
        />
    </ESButton>
]

storiesOf('Atoms.CardNextLive', module).add('Simple', () => (
    <ESCardNextLive
        title={text('Title', 'Live de Correção da prova SUS-SP 2019')}
        date={text('Date', '27/04/2019 às 10h')}
        actions={actions}
    />
))
