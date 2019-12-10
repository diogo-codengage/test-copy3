import React from 'react'

import { Switch, Route, Redirect } from 'react-router-dom'

import RMHomeLives from './Home'
import RMPreviousLive from './Previous'

const RMLives = () => (
    <Switch>
        <Route path='/inicio/lives/atual' component={RMHomeLives} />
        <Route path='/inicio/lives/anterior' component={RMPreviousLive} />
        <Route render={() => <Redirect to='/inicio/lives/atual' />} />
    </Switch>
)

export default RMLives
