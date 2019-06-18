import React from 'react'

import { Switch, Route, Redirect } from 'react-router-dom'

import { SANClassromProvider } from './Context'

const SANClassrom = ({ match: { url } }) => {
    return (
        <SANClassromProvider>
            <div className='classrom'>
                <Switch>
                    <Route
                        path={`${url}/video/:id`}
                        render={() => <div>SANClassromVideo</div>}
                        // component={SANClassromVideo}
                    />
                    <Route
                        path={`${url}/documento/:id`}
                        render={() => <div>SANClassromDocument</div>}
                        // component={SANClassromDocument}
                    />
                    <Route
                        path={`${url}/simulado/:id`}
                        render={() => <div>SANClassromDocument</div>}
                        // component={SANClassromMock}
                    />
                    {/* <Route
                        path={[`${url}/`, `${url}`]}
                        render={() => <Redirect to='/aluno/curso' />}
                    /> */}
                </Switch>
            </div>
        </SANClassromProvider>
    )
}

export default SANClassrom
