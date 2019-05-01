import React from 'react'
import classNames from 'classnames'

import './style.less'

const SANPortalPagesContainer = ({ className, children }) => {
    const classes = classNames(className, 'san-portal-layout__container')
    return <div className={classes}>{children}</div>
}

export default SANPortalPagesContainer
