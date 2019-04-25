import React from 'react'
import PropTypes from 'prop-types'
import { Col } from 'antd'
import classNames from 'classnames'

const ESCol = ({ className, flex, style, type, ...props }) => {
    const classes = classNames('es-col', className, `es-col__${type}`)

    const styles = {
        ...style,
        ...(flex && { flex })
    }

    return <Col style={styles} className={classes} {...props} />
}

ESCol.propTypes = Object.assign(
    { ...Col['propTypes'] },
    {
        flex: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        type: PropTypes.string
    }
)

ESCol.defaultProps = Col['defaultProps']

export default ESCol
