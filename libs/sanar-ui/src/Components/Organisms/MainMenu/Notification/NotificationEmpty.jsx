import React from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'

import ESTypography from '../../../Atoms/Typography'

import emptyNotificationSvg from '../../../../assets/images/empty-notification/empty-notification.svg'

const ESNotificationEmpty = ({ className, title, subtitle }) => {
    const classes = classNames('es-notification-empty', className)

    return (
        <div className={classes}>
            <img src={emptyNotificationSvg} className='mb-xs' />
            <ESTypography level={6} className='mb-xs text-white'>
                {title}
            </ESTypography>
            <ESTypography variant='subtitle2' className='mb-xs text-white-7'>
                {subtitle}
            </ESTypography>
        </div>
    )
}

ESNotificationEmpty.propTypes = {
    className: PropTypes.string,
    title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    subtitle: PropTypes.oneOfType([PropTypes.string, PropTypes.node])
}

ESNotificationEmpty.defaultProps = {
    title: 'Nenhuma por notificação por hora.',
    subtitle: 'Aproveite o momento e estude de maneira mais livre!'
}

export default ESNotificationEmpty
