import React from 'react'
import classNames from 'classnames'
import  PropTypes from 'prop-types'
import { Badge } from 'antd'

type IProps = PropTypes.InferProps<typeof propTypes>
const ESBadge:React.FC<IProps & any> = ({ className, status, border, solid, ...props }) => {
    const classes = classNames('es-badge', className, {
        [`es-badge__${status}`]: status,
        [`es-badge__border`]: border,
        [`es-badge__${status}--solid`]: solid
    })
    return <Badge className={classes} {...props} />
}
const propTypes = Object.assign(
    {
        ...Badge['propTypes']
    },
    {
        className: PropTypes.string,
        status: PropTypes.string,
        onClick: PropTypes.func,
        text: PropTypes.string,
        title: PropTypes.string,
        solid: PropTypes.bool,
        border: PropTypes.bool,
        count: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
    }
)
ESBadge.propTypes = propTypes
ESBadge.defaultProps = {
    status: 'default',
    border: true,
    solid: false
}

export default ESBadge
