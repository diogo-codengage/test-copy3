import React, { useMemo } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useAuthContext } from 'Hooks/auth'

type FLXActiveAccountRouteProps = {
    component: React.ElementType
    path: string
}

const FLXActiveAccountRoute: React.FC<FLXActiveAccountRouteProps> = ({
    component: Component,
    ...rest
}) => {
    const { me } = useAuthContext()

    const active = useMemo(() => me && me.status === 'active', [me])

    return (
        <Route
            {...rest}
            render={props =>
                active ? (
                    <Component {...props} />
                ) : (
                    <Redirect to='/portal/minha-conta' />
                )
            }
        />
    )
}

export default FLXActiveAccountRoute
