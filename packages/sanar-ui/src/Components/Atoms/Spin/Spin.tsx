import React from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'

import { Spin } from 'antd'
type IProps = PropTypes.InferProps<typeof propTypes>
const ESSpin:React.FC<IProps> = ({ className, flex, minHeight, style, dark, ...props }) => {
    const classes = classNames(
        'es-spin',
        { 'es-spin__flex': flex, 'es-spin__dark': dark },
        className
    )
    const styles = {
        ...style,
        ...(minHeight && { minHeight })
    }

    // @ts-ignore
    return <Spin style={styles} className={classes} {...props} />
}
const propTypes = {
    className: PropTypes.string,
    delay: PropTypes.number,
    indicator: PropTypes.node,
    size: PropTypes.oneOf(['small', 'default', 'large']),
    spinning: PropTypes.bool,
    tip: PropTypes.string,
    wrapperClassName: PropTypes.string,
    minHeight: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    flex: PropTypes.any,
    style: PropTypes.object,
    dark: PropTypes.any,
}
ESSpin.propTypes = propTypes
ESSpin.defaultProps = {}

export default ESSpin
