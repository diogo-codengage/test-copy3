import React from 'react'
import PropTypes from 'prop-types'
import Typography from 'antd/lib/typography'
import classNames from 'classnames'

import { ESRow, ESCol } from '../../Atoms/Grid'

const { Title, Text } = Typography

const ESSessionTitle = ({ className, title, subtitle, extra }) => {
    const classes = classNames('es-session-title', className)

    return (
        <ESRow
            type='flex'
            justify='space-between'
            align={subtitle ? 'bottom' : 'top'}
            className={classes}
        >
            <ESCol>
                <Title level={4}>{title}</Title>
                {subtitle && <Text>{subtitle}</Text>}
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
