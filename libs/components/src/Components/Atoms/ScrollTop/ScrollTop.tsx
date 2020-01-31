import React, { useEffect } from 'react'

import { withRouter, RouteProps } from 'react-router-dom'

const SANScrollTop: React.FC<RouteProps> = ({
    children,
    location: { pathname }
}) => {
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [pathname])

    return <>{children}</>
}

export default withRouter(SANScrollTop)
