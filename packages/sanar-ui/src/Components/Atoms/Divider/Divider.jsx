import React from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'

import { Divider } from 'antd'

const ESDivider = ({ className, ...props }) => {
    const classes = classNames('es-divider', className)
    return <Divider className={classes} {...props} />
}

ESDivider.propTypes = Object.assign(
    {
        ...Divider['propTypes']
    },
    {
        className: PropTypes.string
    }
)
ESDivider.defaultProps = Divider['defaultProps']

export default ESDivider
