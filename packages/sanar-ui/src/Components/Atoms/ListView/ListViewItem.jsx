import React from 'react'
import PropTypes from 'prop-types'
import { List, Skeleton } from 'antd'

const ESListViewItem = ({ loading, avatar, children }) => (
    <List.Item className='es-list-view-item'>
        <Skeleton avatar={avatar} loading={loading} active>
            {children}
        </Skeleton>
    </List.Item>
)
ESListViewItem.propTypes = {
    loading: PropTypes.bool,
    avatar: PropTypes.bool
}
ESListViewItem.defaultProps = {}

export default ESListViewItem
