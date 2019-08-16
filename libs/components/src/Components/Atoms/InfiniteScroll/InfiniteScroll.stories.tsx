import React, { useState, useRef } from 'react'
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

const Example = () => {
    const parentRef = useRef()
    const [list, setList] = useState([])

    const loadMore = page => {
        const res = getMock({ offset: list.length })
        console.log({ res })
        setList([...list, ...res])
    }

    return (
        // <div style={{ height: 500, overflow: 'auto' }} ref={parentRef}>
        <SANInfiniteScroll
            // useWindow={false}
            // getScrollParent={() => parentRef}
            pageStart={0}
            loadMore={loadMore}
            hasMore={list.length < 30}
        >
            <List>
                {list.map(item => (
                    <Item key={item.id}>{`${item.title} - ${item.id}`}</Item>
                ))}
            </List>
        </SANInfiniteScroll>
        // </div>
    )
}

storiesOf('Atoms.InfiniteScroll', module).add('Simple', () => <Example />)
