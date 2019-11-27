import React from 'react'
import { Route, Switch, RouteComponentProps, Redirect } from 'react-router-dom'

import RMPracticalProvider from './Context'

import RMFilter from './Filter'
import RMQuestion from './Question'
import RMFinished from './Finished'

const RMPracticalArea = ({ match: { url } }: RouteComponentProps) => (
    <RMPracticalProvider>
        <Switch>
            <Route path={`${url}/filtro`} component={RMFilter} />
            <Route path={`${url}/perguntas`} component={RMQuestion} />
            <Route path={`${url}/finalizado`} component={RMFinished} />
            <Route
                path={[`${url}/`, `${url}`]}
                render={() => <Redirect to={`${url}/filtro`} />}
            />
        </Switch>
    </RMPracticalProvider>
)

export default RMPracticalArea
