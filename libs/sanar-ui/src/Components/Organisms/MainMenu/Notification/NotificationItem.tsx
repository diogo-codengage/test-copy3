import React from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'

import { CSSTransition } from 'react-transition-group'

import ESTypography from '../../../Atoms/Typography'
import ESEvaIcon from '../../../Atoms/EvaIcon'
import ESButton from '../../../Atoms/Button'

const icons = {
    interaction: 'message-circle-outline',
    new: 'star-outline',
    update: 'refresh-outline',
    performance: 'pie-chart-outline',
    live: 'video-outline',
    schedule: 'calendar-outline',
    general: 'globe-2-outline'
}

const ESNotificationItem: React.FC<any> = ({
    className,
    read,
    type,
    icon,
    action,
    text,
    time,
    goToLive,
    markAsRead,
    labelMarkAsRead,
    markAsUnread,
    labelMarkAsUnread,
    labelGoToLive,
    customKey
}) => {
    const classes = classNames(
        'es-notification-item',
        {
            [`es-notification-item__${type}`]: type && !read,
            'es-notification-item__read': read
        },
        className
    )

    return (
        <div className={classes}>
            <span className='icon'>
                <ESEvaIcon name={icons[icon]} />
            </span>
            <div className='d-flex flex-column'>
                {action && (
                    <ESTypography
                        variant='caption'
                        className='mb-xs text-grey-10'
                    >
                        {action}
                    </ESTypography>
                )}
                <ESTypography
                    ellipsis={
                        icon === 'interaction'
                            ? {
                                  rows: 3
                              }
                            : false
                    }
                    variant='subtitle2'
                    className='text-grey-7'
                >
                    {text}
                    {icon === 'live' && (
                        <ESTypography
                            component='a'
                            onClick={goToLive}
                            className='text-grey-7'
                            variant='subtitle2'
                            strong
                        >
                            {` ${labelGoToLive}`}
                        </ESTypography>
                    )}
                </ESTypography>
                <div className='mt-xs d-flex align-items-center justify-content-between'>
                    <ESTypography variant='caption' className='text-grey-5'>
                        {time}
                    </ESTypography>
                    {read ? (
                        <ESButton
                            variant='text'
                            color='primary'
                            bold
                            size='xsmall'
                            onClick={markAsUnread}
                        >
                            {labelMarkAsUnread}
                        </ESButton>
                    ) : (
                        <ESButton
                            variant='text'
                            color='primary'
                            bold
                            size='xsmall'
                            onClick={markAsRead}
                        >
                            {labelMarkAsRead}
                        </ESButton>
                    )}
                </div>
            </div>
        </div>
    )
}

ESNotificationItem.propTypes = {
    className: PropTypes.string,
    type: PropTypes.oneOf(['default', 'medium', 'high']),
    icon: PropTypes.oneOf(Object.keys(icons)),
    text: PropTypes.string,
    action: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    read: PropTypes.bool,
    time: PropTypes.string,
    markAsRead: PropTypes.func,
    markAsUnread: PropTypes.func,
    goToLive: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
    user: PropTypes.string,
    labelReact: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    labelMarkAsRead: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    labelMarkAsUnread: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    labelGoToLive: PropTypes.oneOfType([PropTypes.string, PropTypes.node])
}

ESNotificationItem.defaultProps = {
    labelMarkAsRead: 'Marcar como lida',
    labelMarkAsUnread: 'Marcar como não lida',
    labelGoToLive: 'Ir para Live',
    type: 'default',
    icon: Object.keys(icons)[0]
}

export default ESNotificationItem
