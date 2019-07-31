import React from 'react'
import { List } from 'antd'
import ESBookmarkGridItem from './BookmarkGridItem'

const ESBookmarkGrid = ({ data }) => {
    return (
        <List
            grid={{ gutter: 48, xs: 1, sm: 2, md: 2, lg: 3 }}
            renderItem={item => (
                <List.Item
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >
                    <ESBookmarkGridItem {...item} />
                </List.Item>
            )}
            dataSource={data}
        />
    )
}

export default ESBookmarkGrid
