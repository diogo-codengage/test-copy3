import React, { forwardRef } from 'react'
import PropTypes from 'prop-types'
import { Row } from 'antd'
import classNames from 'classnames'

type IProps = PropTypes.InferProps<typeof propTypes>

const ESRow: React.FC<IProps> =(
    ({ className, direction, flex, style, height, ...props }, ref) => {
        const classes = classNames('es-row', className, {
            [`es-row__direction--${direction}`]: direction
        })

        const styles = {
            ...style,
            ...(flex && { flex }),
            ...(height && { height })
        }

        return <Row ref={ref} style={styles} className={classes} {...props} />
    }
)

const propTypes = Object.assign(
    {
        className: PropTypes.string,
        style: PropTypes.string,
        flex: PropTypes.oneOf([PropTypes.string, PropTypes.number]),
        direction: PropTypes.oneOf(['row', 'column']),
        height: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    }
)

ESRow.propTypes = propTypes

ESRow.defaultProps = Row['defaultProps']

export default forwardRef(ESRow)
