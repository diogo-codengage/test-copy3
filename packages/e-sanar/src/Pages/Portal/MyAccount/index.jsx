import React, { useEffect } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { useLayoutContext } from 'Pages/Portal/Layout/Context'

const SANMyAccountChangePassword = React.lazy(() => import('./ChangePassword'))

const SANMyAccountPage = ({ match: { url } }) => {
    const { setMenuTab } = useLayoutContext()
    useEffect(() => {
        setMenuTab(7)
        // eslint-disable-next-line react-hooks/exhaustive-deps
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
