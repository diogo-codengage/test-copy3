import React from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'

import { Collapse } from 'antd'

const ESCollapsePanel: React.FC<IProps> = ({
    className,
    customKey,
    ...props
}) => {
    const classes = classNames('es-collapse-panel', className)
    return < Collapse.Panel key={customKey} className={classes} {...props} header={props.header} />
}

type IProps = PropTypes.InferProps<typeof propTypes>

const propTypes = Object.assign(
    {...Collapse['prototype']},
    {
    className: PropTypes.string,
    disabled: PropTypes.bool,
    forceRender: PropTypes.bool,
    header: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    customKey: PropTypes.string,
    showArrow: PropTypes.bool,
    extra: PropTypes.node
})

ESCollapsePanel.propTypes = propTypes

ESCollapsePanel.defaultProps = Collapse['defaultProps'] as ESCollapsePanel

export default ESCollapsePanel
