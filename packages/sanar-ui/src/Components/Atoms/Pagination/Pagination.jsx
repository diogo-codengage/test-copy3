import React from 'react'
import PropTypes from 'prop-types'
import Pagination from 'antd/lib/pagination'
import classNames from 'classnames'
import ESButton from '../Button'
import ESEvaIcon from '../EvaIcon'

const customRenderElements = (current, type, originalElement) => {
    switch (type) {
        case 'prev':
            return (
                <ESButton className='es-pagination--arrow--prev' variant='text'>
                    <ESEvaIcon name='chevron-left-outline' />
                </ESButton>
            )
        case 'next':
            return (
                <ESButton className='es-pagination--arrow--next' variant='text'>
                    <ESEvaIcon name='chevron-right-outline' />
                </ESButton>
            )
        case 'jump-next':
            return (
                <ESButton className='es-pagination--jumps' variant='text'>
                    <ESEvaIcon name='more-horizontal-outline' />
                </ESButton>
            )
        case 'jump-prev':
            return (
                <ESButton className='es-pagination--jumps' variant='text'>
                    <ESEvaIcon name='more-horizontal-outline' />
                </ESButton>
            )
        default:
            return originalElement
    }
}

const ESPagination = ({ className, ...props }) => {
    const classes = classNames('es-pagination', className)

    return (
        <Pagination
            className={classes}
            itemRender={customRenderElements}
            {...props}
        />
    )
}

ESPagination.propTypes = Object.assign(
    { ...Pagination['propTypes'] },
    {
        className: PropTypes.string,
        current: PropTypes.number,
        defaultCurrent: PropTypes.number,
        defaultPageSize: PropTypes.number,
        hideOnSinglePage: PropTypes.bool,
        itemRender: PropTypes.node,
        pageSize: PropTypes.number,
        pageSizeOptions: PropTypes.array,
        showLessItems: PropTypes.bool,
        showQuickJumper: PropTypes.bool,
        showSizeChanger: PropTypes.bool,
        showTotal: PropTypes.func,
        simple: PropTypes.bool,
        size: PropTypes.string,
        total: PropTypes.number,
        onChange: PropTypes.func,
        onShowSizeChange: PropTypes.func
    }
)

ESPagination.defaultProps = Pagination['defaultProps']

export default ESPagination
