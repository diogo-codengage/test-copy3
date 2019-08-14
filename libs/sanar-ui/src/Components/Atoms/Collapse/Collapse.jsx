import React from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'

import { Collapse } from 'antd'

const ESCollapse = ({ className, ...props }) => {
    const classes = classNames('es-collapse', className)
    return <Collapse className={classes} {...props} />
}

ESCollapse.propTypes = {
    className: PropTypes.string,
    activeKey: PropTypes.any,
    defaultActiveKey: PropTypes.string,
    bordered: PropTypes.bool,
    accordion: PropTypes.bool,
    onChange: PropTypes.func,
    expandIcon: PropTypes.node,
    expandIconPosition: PropTypes.oneOf(['left', 'right']),
    destroyInactivePanel: PropTypes.bool
}

ESCollapse.defaultProps = {}

export default ESCollapse
