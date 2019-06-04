import React from 'react'
import classNames from 'classnames'

const SANPortalPagesContainer = ({ className, grey, children }) => {
    const classes = classNames(className, 'san-portal-layout__container', {
        'san-portal-layout__container--grey': grey
    })
    return <div className={classes}>{children}</div>
}

export default SANPortalPagesContainer
