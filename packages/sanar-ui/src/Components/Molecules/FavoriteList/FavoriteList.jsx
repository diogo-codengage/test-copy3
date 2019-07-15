import React from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'

const ESFavoriteList = ({ className, ...props }) => {
    const classes = classNames('es-favorite-list', className)
    return <div className={classes} {...props} />
}

ESFavoriteList.propTypes = {
    className: PropTypes.string
}
ESFavoriteList.defaultProps = {}

export default ESFavoriteList
