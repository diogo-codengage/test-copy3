import React from 'react'

import { Switch, Route, Redirect } from 'react-router-dom'

import SANMyAccountChangePassword from './ChangePassword'
import SANMyAccountHelpCenter from './HelpCenter'


const SANMyAccountPage = ({ match: { url } }) => {
    if(url.includes('central-ajuda') ){
        return (
            <div className='help-center'>
                <Switch>
                    <Route
                        path={`${url}/central-ajuda`}
                        component={SANMyAccountHelpCenter}
                    />
                    <Route
                        path={[`${url}/`, `${url}`]}
                        render={() => <Redirect to={`${url}/central-ajuda`} />}
                    />
                </Switch>
            </div>
        )
    } else {
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
    
}

export default SANMyAccountPage
