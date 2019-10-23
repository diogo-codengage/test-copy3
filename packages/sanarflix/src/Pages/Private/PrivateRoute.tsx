import React, { useState, useEffect } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { getInstance } from 'Config/AWSCognito'

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
        getInstance().user.getSession((err, result) => {
            if (!result) {
                setLogged(false)
            }
        })
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
