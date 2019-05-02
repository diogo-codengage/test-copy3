import React from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import { Badge } from 'antd'

const ESBadge = ({ className, status, ...props }) => {
    const classes = classNames('es-badge', className, {
        [`es-badge__${status}`]: status
    })
    return <Badge className={classes} {...props} />
}

ESBadge.propTypes = Object.assign(
    {
        ...Badge['propTypes']
    },
    {
        className: PropTypes.string,
        onClick: PropTypes.func,
        text: PropTypes.string,
        title: PropTypes.string,
        count: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
    }
)
ESBadge.defaultProps = {
    status: 'default'
}

export default ESBadge
