import React from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'

import { Collapse } from 'antd'

const Panel = Collapse.Panel

const ESCollapsePanel = ({ className, customKey, ...props }) => {
    const classes = classNames('es-collapse-panel', className)
    return <Panel key={customKey} className={classes} {...props} />
}

ESCollapsePanel.propTypes = {
    className: PropTypes.string,
    disabled: PropTypes.bool,
    forceRender: PropTypes.bool,
    header: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    customKey: PropTypes.string,
    showArrow: PropTypes.bool,
    extra: PropTypes.node
}

ESCollapsePanel.defaultProps = {}

export default ESCollapsePanel
