import React from 'react'
import PropTypes from 'prop-types'
import Modal from 'antd/lib/modal'
import classNames from 'classnames'

import ESModalFooter from './ModalFooter'

const ESModal = ({ className, footer, children, ...props }) => {
    const classes = classNames('es-modal', className)

    const mapChildren = child => child.type === ESModalFooter && child

    const kids = React.Children.toArray(children)
    const footerChild = children.find(mapChildren)

    return (
        <Modal
            className={classes}
            {...props}
            footer={footer ? footer : footerChild ? footerChild : null}
        >
            {kids.splice(footerChild, 1)}
        </Modal>
    )
}

ESModal.propTypes = Object.assign(
    { ...Modal['propTypes'] },
    {
        className: PropTypes.string
    }
)

ESModal.defaultProps = Modal['defaultProps']

export default ESModal
