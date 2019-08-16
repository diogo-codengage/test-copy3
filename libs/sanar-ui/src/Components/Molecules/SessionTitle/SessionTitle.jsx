import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import { ESRow, ESCol } from '../../Atoms/Grid'
import ESTypography from '../../Atoms/Typography'

const ESSessionTitle = ({
    className,
    title,
    subtitle,
    extra,
    extraOnLeft,
    levelTitle,
    children
}) => {
    const classes = classNames('es-session-title', className)

    const extraClasses = classNames('es-session-title__extra', {
        'es-session-title__extra--on-left': extraOnLeft
    })

    const titleClasses = classNames('es-session-title__texts--title', {
        'mb-xs': subtitle
    })

    return (
        <ESRow
            type='flex'
            justify='space-between'
            align={subtitle ? 'bottom' : extra ? 'middle' : 'top'}
            className={classes}
            gutter={24}
        >
            <ESCol className='es-session-title__texts'>
                {typeof title === 'string' ? (
                    <ESTypography className={titleClasses} level={levelTitle}>
                        {title}
                    </ESTypography>
                ) : (
                    title
                )}
                {subtitle &&
                    (typeof subtitle === 'string' ? (
                        <ESTypography
                            className='es-session-title__texts--subtitle'
                            ellipsis
                        >
                            {subtitle}
                        </ESTypography>
                    ) : (
                        subtitle
                    ))}
            </ESCol>
            {extra && <ESCol className={extraClasses}>{extra}</ESCol>}
        </ESRow>
    )
}

ESSessionTitle.propTypes = {
    className: PropTypes.string,
    title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    subtitle: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    extra: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    align: PropTypes.oneOf(['top', 'middle', 'bottom']),
    extraOnLeft: PropTypes.bool,
    levelTitle: PropTypes.number
}

ESSessionTitle.defaultProps = {
    align: 'bottom',
    levelTitle: 5
}

export default ESSessionTitle
