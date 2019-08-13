import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

const ESModalFooter = ({ className, ...props }) => {
    const classes = classNames('es-modal-footer', className)

    return <div className={classes} {...props} />
}

ESModalFooter.propTypes = {
    className: PropTypes.string
}

ESModalFooter.defaultProps = {}

export default ESModalFooter
