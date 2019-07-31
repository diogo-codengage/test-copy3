import React from 'react'
import PropTypes from 'prop-types'

import ESListView, { ESListViewItem } from '../../Atoms/ListView'

import ESBookmarkGridItem from './BookmarkGridItem'

const renderItem = item => (
    <ESListViewItem className='d-flex align-items-center justify-content-center'>
        <ESBookmarkGridItem {...item} />
    </ESListViewItem>
)

const ESBookmarkGrid = ({ data, ...props }) => (
    <ESListView
        {...props}
        grid={{ gutter: 24, xs: 1, sm: 2, md: 2, lg: 3 }}
        renderItem={renderItem}
        dataSource={data}
    />
)

ESBookmarkGrid.propTypes = {
    data: PropTypes.shape({
        image: PropTypes.string,
        resourceType: PropTypes.string,
        subtitle: PropTypes.string,
        title: PropTypes.string,
        onRemove: PropTypes.func
    })
}

export default ESBookmarkGrid
