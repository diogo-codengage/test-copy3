import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import { ESRow, ESCol } from '../../Atoms/Grid'
import ESTypography from '../../Atoms/Typography'

const ESSessionTitle = ({ className, title, subtitle, extra }) => {
    const classes = classNames('es-session-title', className)

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
                <ESTypography className={titleClasses} level={5}>
                    {title}
                </ESTypography>
                {subtitle && (
                    <ESTypography
                        className='es-session-title__texts--subtitle'
                        ellipsis
                    >
                        {subtitle}
                    </ESTypography>
                )}
            </ESCol>
            {extra && (
                <ESCol className='es-session-title__extra'>{extra}</ESCol>
            )}
        </ESRow>
    )
}

ESSessionTitle.propTypes = {
    className: PropTypes.string,
    title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    subtitle: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    extra: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    align: PropTypes.oneOf(['top', 'middle', 'bottom'])
}

ESSessionTitle.defaultProps = {
    align: 'bottom'
}

export default ESSessionTitle
