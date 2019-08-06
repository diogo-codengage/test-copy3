import React, { useState, useEffect } from 'react'
import { Route, Redirect } from 'react-router-dom'

type FLXPrivateRouteProps = {
    component: React.ElementType
    path: string
}

const FLXPrivateRoute: React.FC<FLXPrivateRouteProps> = ({
    component: Component,
    ...rest
}) => {
    const [logged, setLogged] = useState(true)

    useEffect(() => {
        setLogged(true)
    }, [setLogged])

    return (
        <Route
            {...rest}
            render={props =>
                logged ? <Component {...props} /> : <Redirect to='/auth' />
            }
        />
    )
}

export default FLXPrivateRoute
