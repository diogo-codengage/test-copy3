import React, { useState } from 'react'
import { storiesOf } from '@storybook/react'

import styled from 'styled-components'
import SANInfiniteScroll from './InfiniteScroll'

import mockData from './data.json'

const getMock = ({ limit = 10, offset = 0 }) =>
    mockData.slice(offset, offset + limit)

const List = styled.div``

const Item = styled.div`
    padding: 24px;
    width: 100%;
    margin-bottom: 3px;
    border-radius: 4px;
    background-color: #676161;
    color: white;
`

const renderItem = item => (
    <Item key={item.id}>{`${item.title} - ${item.id}`}</Item>
)

const Example = () => {
    const [list, setList] = useState([])

    const loadMore = page =>
        setTimeout(() => {
            const res = getMock({ offset: list.length })
            setList([...list, ...res])
        }, 2000)

    return (
        <SANInfiniteScroll
            pageStart={0}
            loadMore={loadMore}
            hasMore={list.length < 289}
        >
            <List>{list.map(renderItem)}</List>
        </SANInfiniteScroll>
    )
}

storiesOf('Atoms.InfiniteScroll', module).add('Simple', () => <Example />)
