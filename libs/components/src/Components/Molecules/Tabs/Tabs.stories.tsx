import React from 'react'
import { storiesOf } from '@storybook/react'
import { number, boolean, select } from '@storybook/addon-knobs'

import SANTabs from './Tabs'
import SANTabPane from './TabPane'

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

storiesOf('Molecules.Tabs', module).add('Simple', () => (
    <SANTabs
        defaultActiveKey='1'
        center={boolean('Center', true)}
        dark={boolean('Dark', false)}
        tabBarGutter={number('Gutter', 0)}
        size={select('Size', sizeOptions, 'default')}
        type={select('Type', typeOptions, 'line')}
        tabPosition={select('Tab position', positionOptions, 'top')}
    >
        <SANTabPane tab='Dados cadastrais' key='1'>
            Tab - 01
        </SANTabPane>
        <SANTabPane tab='Alterar senha' key='2'>
            Tab - 02
        </SANTabPane>
    </SANTabs>
))
