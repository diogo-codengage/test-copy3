import React, { useEffect } from 'react'

import { Switch, Route, Redirect } from 'react-router-dom'

import SANMyAccountChangePassword from './ChangePassword'
import { useLayoutContext } from 'Pages/Portal/Layout/Context'

const SANMyAccountPage = ({ match: { url } }) => {
    const { setMenuTab } = useLayoutContext()
    useEffect(() => {
        setMenuTab(7)
    }, [])

    return (
        <div className='my-account-page'>
            <Switch>
                <Route
                    path={`${url}/alterar-senha`}
                    component={SANMyAccountChangePassword}
                />
                <Route
                    path={[`${url}/`, `${url}`]}
                    render={() => <Redirect to={`${url}/alterar-senha`} />}
                />
            </Switch>
        </div>
    )
}

export default SANMyAccountPage
