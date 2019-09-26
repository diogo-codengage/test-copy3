import React from 'react'
import { Route, Switch, RouteComponentProps } from 'react-router-dom'

import FLXQuestionsProvider from './Context'

import FLXFilter from './Filter'
import FLXQuestion from './Question'
import FLXFinished from './Finished'

const FLXQuestionsDatabase = ({ match: { url } }: RouteComponentProps) => (
    <FLXQuestionsProvider>
        <Switch>
            <Route path={`${url}/filtro`} component={FLXFilter} />
            <Route path={`${url}/perguntas`} component={FLXQuestion} />
            <Route path={`${url}/finalizado`} component={FLXFinished} />
        </Switch>
    </FLXQuestionsProvider>
)

export default FLXQuestionsDatabase
