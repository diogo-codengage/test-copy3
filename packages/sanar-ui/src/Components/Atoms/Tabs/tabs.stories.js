import React, { useState } from 'react'
import { storiesOf } from '@storybook/react'
import { select } from '@storybook/addon-knobs'

import ESTabs from './Tabs'
import ESTabPane from './TabPane'

const sizeOptions = {
    Default: 'default',
    Large: 'large',
    Small: 'small'
}

const typeOptions = {
    Line: 'line',
    Card: 'card',
    EditableCard: 'editable-card'
}

const positionOptions = {
    Top: 'top',
    Right: 'right',
    Bottom: 'bottom',
    Left: 'left'
}

storiesOf('Atoms.Tabs', module).add('Simple', () => (
    <ESTabs
        defaultActiveKey='1'
        size={select('Size', sizeOptions, 'default')}
        type={select('Type', typeOptions, 'line')}
        tabPosition={select('Tab position', positionOptions, 'top')}
    >
        <ESTabPane tab='Dados cadastrais' key='1'>
            Content Dados cadastrais
        </ESTabPane>
        <ESTabPane tab='Alterar senha' key='2'>
            Content Alterar senha
        </ESTabPane>
    </ESTabs>
))
