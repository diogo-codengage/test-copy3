import React from 'react'
import './App.less'
import { RMGraphQLProvider } from './Apollo/GraphQLService'
import { HashRouter, Switch, Route, Redirect } from 'react-router-dom'
import 'sanar-ui/dist/Config/i18n'
import { QuestionsPage } from './Pages/Questions/QuestionsPage'

const App: React.FC = () => {
    return (
        <RMGraphQLProvider>
            <HashRouter>
                <Route
                    path="/Questions"
                    component={QuestionsPage}
                />
                {/*<Route*/}
                {/*    path={`/*`}*/}
                {/*    render={() => <Redirect to={`/Questions`}/>}*/}
                {/*/>*/}
            </HashRouter>
        </RMGraphQLProvider>
    )
}

export default App
