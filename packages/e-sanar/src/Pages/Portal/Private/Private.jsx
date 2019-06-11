import React, { useState, useEffect } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { Auth } from 'aws-amplify'
import ESIcon from 'sanar-ui/dist/Components/Atoms/Icon'

const PrivateRoute = ({ component: Component, ...rest }) => {
    const [loading, setLoading] = useState(false)
    const [logged, setLogged] = useState(true)

    const verifyToken = () => {
        setLoading(true)

        Auth.currentAuthenticatedUser()
            .then(() => {
                setLoading(false)
                setLogged(true)
            })
            .catch(() => {
                setLoading(false)
                setLogged(false)
            })
    }

    useEffect(() => {
        verifyToken()
    }, [])

    if (loading) {
        return <ESIcon type='loading' spin />
    }

    return (
        <Route
            {...rest}
            render={props =>
                logged ? <Component {...props} /> : <Redirect to='/auth' />
            }
        />
    )
}

export default PrivateRoute
