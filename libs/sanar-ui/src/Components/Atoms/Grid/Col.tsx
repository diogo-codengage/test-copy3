import React, { forwardRef } from 'react'
import PropTypes from 'prop-types'
import { Col } from 'antd'
import classNames from 'classnames'

type IProps = PropTypes.InferProps<typeof propTypes>

const ESCol: React.FC<IProps> = forwardRef(
    ({ className, flex, style, type, alignSelf, ...props }, ref:any) => {
        const classes = classNames('es-col', className, {
            [`es-col__${type}`]: type
        })

        const styles = {
            ...style,
            ...(flex && { flex }),
            ...(alignSelf && { alignSelf })
        }

        return <Col ref={ref} style={styles} className={classes} {...props} />
    }
)

const propTypes = Object.assign(
    {
        className: PropTypes.string,
        style: PropTypes.object,
        flex: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        alignSelf: PropTypes.oneOf([
            'auto',
            'baseline',
            'center',
            ' end',
            'flex-end',
            'flex-start',
            'inherit',
            'initial',
            'left',
            'normal',
            'right',
            'safe',
            'self-end',
            'self-start',
            'start',
            'stretch',
            'unsafe',
            'unset'
        ]),
        type: PropTypes.string
    },
)
ESCol.propTypes = propTypes

ESCol.defaultProps = Col['defaultProps']

export default ESCol
