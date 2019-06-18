import React from 'react'

import { Switch, Route, Redirect } from 'react-router-dom'

import { SANClassromProvider } from './Context'

const SANClassrom = ({ match: { url } }) => {
    return (
        <SANClassromProvider>
            <div className='classrom'>
                <Switch>
                    <Route
                        path={`${url}/video`}
                        render={() => <div>SANClassromVideo</div>}
                        // component={SANClassromVideo}
                    />
                    <Route
                        path={`${url}/documento`}
                        render={() => <div>SANClassromDocument</div>}
                        // component={SANClassromDocument}
                    />
                    <Route
                        path={`${url}/simulado`}
                        render={() => <div>SANClassromDocument</div>}
                        // component={SANClassromMock}
                    />
                    <Route
                        path={[`${url}/`, `${url}`]}
                        render={() => <Redirect to={`${url}/video`} />}
                    />
                </Switch>
            </div>
        </SANClassromProvider>
    )
}

export default SANClassrom
