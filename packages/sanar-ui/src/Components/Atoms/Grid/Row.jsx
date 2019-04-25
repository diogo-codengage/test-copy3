import React from 'react'
import PropTypes from 'prop-types'
import { Row } from 'antd'
import classNames from 'classnames'

const ESRow = ({ className, direction, flex, style, height, ...props }) => {
    const classes = classNames(
        'es-row',
        className,
        `es-row__direction--${direction}`
    )

    const styles = {
        ...style,
        ...(flex && { flex }),
        ...(height && { height })
    }

    return <Row style={styles} className={classes} {...props} />
}

ESRow.propTypes = Object.assign(
    { ...Row['propTypes'] },
    {
        flex: PropTypes.oneOf([PropTypes.string, PropTypes.number]),
        direction: PropTypes.oneOf(['row', 'column']),
        height: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    }
)

ESRow.defaultProps = Row['defaultProps']

export default ESRow
