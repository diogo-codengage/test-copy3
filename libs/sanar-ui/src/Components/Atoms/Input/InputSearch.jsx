import React from 'react'
import PropTypes from 'prop-types'
import Input from 'antd/lib/input'
import classNames from 'classnames'

const Search = Input.Search

const ESInputSearch = ({ className, dark, ...props }) => {
    const classes = classNames(
        'es-input-search',
        { 'es-input-search__dark': dark },
        className
    )

    return <Search className={classes} {...props} />
}

ESInputSearch.propTypes = Object.assign(
    { ...Search['propTypes'] },
    {
        className: PropTypes.string,
        onSearch: PropTypes.func,
        dark: PropTypes.bool
    }
)

ESInputSearch.defaultProps = Search['defaultProps']

export default ESInputSearch
