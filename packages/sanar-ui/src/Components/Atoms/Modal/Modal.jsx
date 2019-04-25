import React from 'react'
import PropTypes from 'prop-types'
import Modal from 'antd/lib/modal'
import classNames from 'classnames'

const ESModal = ({ className, ...props }) => {
    const classes = classNames('es-modal', className)

    return <Modal className={classes} {...props} />
}

ESModal.propTypes = Object.assign(
    { ...Modal['propTypes'] },
    {
        className: PropTypes.string
    }
)

ESModal.defaultProps = Modal['defaultProps']

export default ESModal
