import React from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'

import { Spin } from 'antd'

const ESSpin = ({ className, flex, ...props }) => {
    const classes = classNames('es-spin', { 'es-spin__flex': flex }, className)
    return <Spin className={classes} {...props} />
}

ESSpin.propTypes = {
    className: PropTypes.string,
    delay: PropTypes.number,
    indicator: PropTypes.node,
    size: PropTypes.oneOf(['small', 'default', 'large']),
    spinning: PropTypes.bool,
    tip: PropTypes.string,
    wrapperClassName: PropTypes.string
}
ESSpin.defaultProps = {}

export default ESSpin
