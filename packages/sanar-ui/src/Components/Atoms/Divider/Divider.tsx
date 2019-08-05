import React from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'

import { Divider } from 'antd'

type IProps = PropTypes.InferProps<typeof propTypes>

const ESDivider: React.FC<IProps>=({ className, color, ...props }) => {
    const classes = classNames('es-divider', className, {
        'es-divider__grey': color === 'grey'
    })
    return <Divider className={classes} {...props} />
}

const propTypes = Object.assign(
    {
        ...Divider['propTypes']
    },
    {
        className: PropTypes.string,
        color: PropTypes.string
    }
)

ESDivider.propTypes = propTypes

ESDivider.defaultProps = Divider['defaultProps']

export default ESDivider
