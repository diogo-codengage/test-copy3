import React from 'react'

import { Switch, Route, Redirect } from 'react-router-dom'

import SANMyAccountChangePassword from './ChangePassword'
import SANMyAccountHelpCenter from './HelpCenter'


const SANMyAccountPage = ({ match: { url } }) => {
    return (
        <div className='my-account-page'>
            <Switch>
                <Route
                    path={`${url}/central-ajuda`}
                    component={SANMyAccountHelpCenter}
                />
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
