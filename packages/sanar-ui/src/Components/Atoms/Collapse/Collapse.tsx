import React from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'

import { Collapse } from 'antd'

const ESCollapse: React.FC<IProps> = ({ className, ...props }) => {
    const classes = classNames('es-collapse', className)
    return <Collapse className={classes} {...props} />
}

type IProps = PropTypes.InferProps<typeof propTypes>

const propTypes = Object.assign(
    {...Collapse['prototype']},
    {
    className: PropTypes.string,
    activeKey: PropTypes.any,
    defaultActiveKey: PropTypes.array,
    bordered: PropTypes.bool,
    accordion: PropTypes.bool,
    onChange: PropTypes.func,
    expandIcon: PropTypes.func,
    expandIconPosition: PropTypes.any,
    destroyInactivePanel: PropTypes.bool
})

ESCollapse.propTypes = propTypes

ESCollapse.defaultProps = Collapse['defaultProps']

export default ESCollapse
