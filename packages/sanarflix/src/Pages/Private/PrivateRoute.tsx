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

declare var Conpass:any;

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
                //TODO Remover o if a seguir assim que validar a hipótese do name estar como null
                if(!me.name || me.name === null) console.error(`Me has an invalid name : ${JSON.stringify(me)}`) 
                Conpass.init({
                    name: me.name,
                    email: me.email,

                    // Informações opcionais (usado para segmentação)
                    // custom_fields: {
                    //   lang: "pt_BR",
                    //   sexo: "Feminino",
                    // }
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
