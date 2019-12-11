import React, { useMemo } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useAuthContext } from 'Hooks/auth'
import FLXSplashLoader from 'Components/SplashLoader'

type FLXActiveAccountRouteProps = {
    component: React.ElementType
    path: string
}

const FLXActiveAccountRoute: React.FC<FLXActiveAccountRouteProps> = ({
    component: Component,
    ...rest
}) => {
    const { me } = useAuthContext()

    // const active = useMemo(() => me && me.status === 'active', [me])
    const active = useMemo(() => true, [me])

    return (
        <Route
            {...rest}
            render={props =>
                me ? (
                    active ? (
                        <Component {...props} />
                    ) : (
                        <Redirect to='/portal/minha-conta' />
                    )
                ) : (
                    <FLXSplashLoader />
                )
            }
        />
    )
}

export default FLXActiveAccountRoute
