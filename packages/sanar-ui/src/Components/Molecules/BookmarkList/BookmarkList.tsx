import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import ESListView, { ESListViewItem } from '../../Atoms/ListView'

import ESBookmarkGridItem from './BookmarkGridItem'
import ESBookmarkListItem from './BookmarkListItem'

const Item = ({ orientation, ...props }) => (
    <ESListViewItem className='d-flex align-items-center justify-content-center'>
        {orientation === 'grid' ? (
            <ESBookmarkGridItem {...props} />
        ) : (
            <ESBookmarkListItem {...props} />
        )}
    </ESListViewItem>
)

const ESBookmarkList = ({
    className,
    onClick,
    onRemove,
    orientation,
    data,
    ...props
}) => {
    const classes = classNames(
        'es-favorite',
        {
            'es-favorite-grid': orientation === 'grid',
            'es-favorite-list': orientation === 'list' && !!data.length
        },
        className
    )

    const grid =
        orientation === 'grid'
            ? { gutter: 24, xs: 1, sm: 2, md: 2, lg: 3 }
            : { xs: 1 }

    const renderItem = item => {
        const renderProps = {
            ...item,
            orientation,
            onClick: () => onClick(item),
            onRemove: () => onRemove(item)
        }

        return <Item {...renderProps} />
    }

    return (
        <ESListView
            className={classes}
            grid={grid}
            renderItem={renderItem}
            dataSource={data}
            {...props}
        />
    )
}

ESBookmarkList.propTypes = {
    orientation: PropTypes.oneOf(['grid', 'list']),
    onRemove: PropTypes.func,
    onClick: PropTypes.func,
    data: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string,
            image: PropTypes.string,
            resourceType: PropTypes.oneOf(['Video', 'Document', 'Question'])
                .isRequired,
            subtitle: PropTypes.string,
            title: PropTypes.string
        })
    )
}

ESBookmarkList.defaultProps = {
    orientation: 'grid'
}

export default ESBookmarkList
