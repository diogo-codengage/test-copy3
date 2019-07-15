import React from 'react'
import { List } from 'antd'
import ESFavoriteGridItem from './FavoriteGridItem'

const ESFavoriteGrid = ({ data }) => {
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
                    <ESFavoriteGridItem {...item} />
                </List.Item>
            )}
            dataSource={data}
        />
    )
}

export default ESFavoriteGrid
