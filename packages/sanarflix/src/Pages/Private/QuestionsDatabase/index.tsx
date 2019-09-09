import React from 'react'
import { Route, Switch, RouteComponentProps } from 'react-router-dom'

import FLXQuestionsProvider from './Context'

const SANFilter = React.lazy(() => import('./Filter'))

type FLXPrivatePages = {}

const FLXFilter: React.FC<RouteComponentProps<FLXPrivatePages>> = ({
    match: { url }
}) => (
    <FLXQuestionsProvider>
        <Switch>
            <Route path={`${url}/filtro`} component={SANFilter} />
        </Switch>
    </FLXQuestionsProvider>
)

export default FLXFilter
