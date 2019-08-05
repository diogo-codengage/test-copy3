import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import Icon from 'react-eva-icons'
import { esConvertFormattedTimeToSeconds } from '../../../Util/Date';

const ESEvaIcon: React.FC<Iprops> = ({ className, onClick, style, size, color, ...props }) => {
    const classes = classNames('anticon', 'es-eva-icon', className, {
        [`es-eva-icon--${size}`]: size,
        [`es-eva-icon--${color}`]: color
    })

    return (
        <i style={style} className={classes} onClick={onClick}>
            <Icon {...props} />
        </i>
    )
}

type Iprops  = PropTypes.InferProps<typeof propTypes>

const propTypes = Object.assign(
    { ...Icon['propTypes'] },
    {
        className: PropTypes.any,
        size: PropTypes.oneOf(['xsmall', 'small', 'medium', 'large', 'xlarge']),
        color: PropTypes.oneOf([
            'primary',
            'secondary',
            'success',
            'warning',
            'error',
            'info',
            'default',
            'light',
            'grey'
        ]),
    }
)

ESEvaIcon.propTypes = propTypes
ESEvaIcon.defaultProps = Icon['defaultProps']

export default ESEvaIcon
