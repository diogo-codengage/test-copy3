import React from 'react'
import { Route, Switch, RouteComponentProps } from 'react-router-dom'

import RMPracticalProvider from './Context'

import RMFilter from './Filter'

const RMPracticalArea = ({ match: { url } }: RouteComponentProps) => (
    <RMPracticalProvider>
        <Switch>
            <Route path={`${url}/filtro`} component={RMFilter} />
        </Switch>
    </RMPracticalProvider>
)

export default RMPracticalArea
