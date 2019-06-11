import React from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'

import { Spin } from 'antd'

const ESSpin = ({ className, flex, minHeight, style, ...props }) => {
    const classes = classNames('es-spin', { 'es-spin__flex': flex }, className)
    const styles = {
        ...style,
        ...(minHeight && { minHeight })
    }

    return <Spin style={styles} className={classes} {...props} />
}

ESSpin.propTypes = {
    className: PropTypes.string,
    delay: PropTypes.number,
    indicator: PropTypes.node,
    size: PropTypes.oneOf(['small', 'default', 'large']),
    spinning: PropTypes.bool,
    tip: PropTypes.string,
    wrapperClassName: PropTypes.string
    minHeight: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
}
ESSpin.defaultProps = {}

export default ESSpin
