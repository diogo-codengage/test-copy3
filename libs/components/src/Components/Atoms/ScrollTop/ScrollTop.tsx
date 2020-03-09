import React, { useEffect } from 'react'

import { withRouter, RouteProps } from 'react-router-dom'

const isClient = typeof window === 'object'

const SANScrollTop: React.FC<RouteProps> = ({
    children,
    location: { pathname }
}) => {
    useEffect(() => {
        isClient && window.scrollTo(0, 0)
    }, [pathname])

    return <>{children}</>
}

export default withRouter(SANScrollTop)
