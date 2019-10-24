import React, { useState, useEffect } from 'react'
import { Route, Redirect } from 'react-router-dom'

import { useAuthContext } from 'Hooks/auth'
import { getInstance } from 'Config/AWSCognito'

type FLXPrivateRouteProps = {
    component: React.ElementType
    path: string
}

const FLXPrivateRoute: React.FC<FLXPrivateRouteProps> = ({
    component: Component,
    ...rest
}) => {
    const { setMe } = useAuthContext()
    const [logged, setLogged] = useState(true)

    useEffect(() => {
        getInstance().user.getSession((_, result) => {
            if (!result) {
                setMe(undefined)
                setLogged(false)
            }
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <Route
            {...rest}
            render={props =>
                logged ? (
                    <Component {...props} />
                ) : (
                    <Redirect to='/auth/signin' />
                )
            }
        />
    )
}

export default FLXPrivateRoute
