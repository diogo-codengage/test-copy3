import React from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'

import { TransitionGroup } from 'react-transition-group'

const ESNotificationList = ({ className, children }) => {
    const classes = classNames('es-notification-list', className)

    return <TransitionGroup className={classes}>{children}</TransitionGroup>
}

ESNotificationList.propTypes = {
    className: PropTypes.string
}

ESNotificationList.defaultProps = {}

export default ESNotificationList
