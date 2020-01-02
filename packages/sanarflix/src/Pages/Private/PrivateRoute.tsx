import React, { useState, useEffect } from 'react'
import {
    Route,
    Redirect,
    withRouter,
    RouteComponentProps
} from 'react-router-dom'
import { useApolloClient } from '@apollo/react-hooks'

import { useAuthContext } from 'Hooks/auth'
import { getInstance } from 'Config/AWSCognito'
import { GET_ME } from 'Apollo/User/Queries/me'
import * as Sentry from '@sentry/browser';
declare var Conpass: any;

interface FLXPrivateRouteProps extends RouteComponentProps {
    component: React.ElementType
    path: string
}

const FLXPrivateRoute: React.FC<FLXPrivateRouteProps> = ({
    component: Component,
    history,
    ...rest
}) => {
    const client = useApolloClient()
    const { setMe } = useAuthContext()
    const [logged, setLogged] = useState(true)

    const logout = () => {
        const config = getInstance()
        const user = config.userPool.getCurrentUser()
        if (!!user) {
            user.signOut()
            setMe(undefined)
            history.push('/auth/signin')
        }
    }

    const fetchMe = async () => {
        try {
            const {
                data: { me },
                errors
            } = await client.query({ query: GET_ME })

            if (!!errors) {
                throw new Error()
            } else {
                setMe(me)

                // if (window["Conpass"]) {
                //     window["Conpass"].init({
                //         name: 'Kati' || 'anônimo',
                //         email: 'kati.zolin@gmail.com' || 'anonimo@sanarflix.com.br',
                //     })

                //     window["Conpass"].debug()
                // }

                Conpass.init({
                    name: 'Kati' || 'anônimo',
                    email: 'kati.zolin@gmail.com' || 'anonimo@sanarflix.com.br',
                });

                Conpass.debug()

                Sentry.configureScope((scope) => {
                    scope.setUser(
                        {
                            "id": me.id,
                            "name": me.name,
                            "email": me.email
                        }
                    );
                });
            }
        } catch {
            logout()
        }
    }

    useEffect(() => {
        getInstance().user.getSession((_, result) => {
            if (!!result) {
                fetchMe()
            } else {
                logout()
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

export default withRouter(FLXPrivateRoute)
