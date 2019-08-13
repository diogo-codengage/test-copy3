import React from 'react'
import { storiesOf } from '@storybook/react'
import { select, boolean, text } from '@storybook/addon-knobs'

import ESCard from './Card'
import ESButton from '../../Atoms/Button'

import { Avatar, Skeleton } from 'antd'
import Meta from 'antd/lib/card/Meta'

const sizeOptions = {
    Default: 'default',
    Small: 'small'
}
const actions = [
    <ESButton clear ghost type='primary'>
        Action 1
    </ESButton>,
    <ESButton clear ghost type='primary'>
        Action 2
    </ESButton>
]

const showActions = () => boolean('Actions', false)

storiesOf('Molecules.Card', module).add('Simple', () => (
    <ESCard
        actions={boolean('Actions', false) ? actions : null}
        loading={boolean('Loading', false)}
        hoverable={boolean('Hoverable', false)}
        size={select('Size', sizeOptions, 'small')}
        style={{ width: 300 }}
        title={text('Title', 'SANAR-UI CARD - TITLE')}
        doubt={text('Doubt', 'Lorem ipsum...')}
    >
        <Meta
            avatar={
                <Avatar src='https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png' />
            }
            title='Content title'
            description='This is the description'
        />
    </ESCard>
))
