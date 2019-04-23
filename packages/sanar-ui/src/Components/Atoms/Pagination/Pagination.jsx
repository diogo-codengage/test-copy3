import React from 'react'
import PropTypes from 'prop-types'
import Pagination from 'antd/lib/pagination'
import classNames from 'classnames'

const ESPagination = ({ className, ...props }) => {
    const classes = classNames('es-pagination', className)

    return <Pagination className={classes} {...props} />
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
