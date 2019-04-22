import React from 'react'
import PropTypes from 'prop-types'
import Input from 'antd/lib/input'
import classNames from 'classnames'

const Search = Input.Search

const ESInputSearch = ({ className, ...props }) => {
    const classes = classNames('es-input-search', className)

    return <Search className={classes} {...props} />
}

ESInputSearch.propTypes = Object.assign(
    { ...Search['propTypes'] },
    {
        className: PropTypes.string,
        onSearch: PropTypes.func,
        enterButton: PropTypes.bool
    }
)

ESInputSearch.defaultProps = Search['defaultProps']

export default ESInputSearch
