import React from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'

const ESPlaylist = ({ className, ...props }) => {
    const classes = classNames('es-playlist-list', className)
    return <div className={classes} {...props} />
}

ESPlaylist.propTypes = {
    className: PropTypes.string
}
ESPlaylist.defaultProps = {}

export default ESPlaylist
