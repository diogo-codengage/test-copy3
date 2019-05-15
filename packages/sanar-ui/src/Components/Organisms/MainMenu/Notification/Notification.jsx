import React from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'

import ESTypography from '../../../Atoms/Typography'
import ESEvaIcon from '../../../Atoms/EvaIcon'
import ESButton from '../../../Atoms/Button'

const icons = {
    react: 'message-circle-outline',
    live: 'calendar-outline',
    late: 'pie-chart-outline'
}

const ESNotification = ({
    className,
    read,
    type,
    user,
    labelReact,
    text,
    time,
    goToLive,
    markAsRead,
    labelMarkAsRead,
    markAsUnead,
    labelMarkAsUnead,
    labelGoToLive
}) => {
    const classes = classNames(
        'es-notification',
        {
            [`es-notification__${type}`]: type && !read,
            'es-notification__read': read
        },
        className
    )

    return (
        <div className={classes}>
            <span className='icon'>
                <ESEvaIcon name={icons[type]} />
            </span>
            <div className='d-flex flex-column'>
                {type === 'react' && (
                    <ESTypography
                        variant='caption'
                        className='mb-xs text-grey-10'
                    >
                        <strong>{`${user} `}</strong>
                        {labelReact}
                    </ESTypography>
                )}
                <ESTypography variant='subtitle2' className='text-grey-7'>
                    {text}
                    {type === 'live' && (
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
                            onClick={markAsUnead}
                        >
                            {labelMarkAsUnead}
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

ESNotification.propTypes = {
    className: PropTypes.string,
    type: PropTypes.oneOf(['react', 'live', 'late']),
    text: PropTypes.string,
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

ESNotification.defaultProps = {
    labelReact: 'reagiu ao seu comentário',
    labelMarkAsRead: 'Marcar como lida',
    labelMarkAsUnread: 'Marcar como não lida',
    labelGoToLive: 'Ir para Live'
}

export default ESNotification
