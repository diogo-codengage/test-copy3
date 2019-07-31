import React from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'

const ESBookmarkList = ({ className, ...props }) => {
    const classes = classNames('es-favorite-list', className)
    return <div className={classes} {...props} />
}

ESBookmarkList.propTypes = {
    className: PropTypes.string
}
ESBookmarkList.defaultProps = {}

export default ESBookmarkList
