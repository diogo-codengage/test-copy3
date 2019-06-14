import React from 'react'
import './App.less'
import { RMGraphQLProvider } from './Apollo/GraphQLService'
import { HashRouter, Switch, Route, Redirect } from 'react-router-dom'
import 'sanar-ui/dist/Config/i18n'
import { QuestionsPage } from './Pages/Questions/QuestionsPage'
import { HomePage } from './Pages/Home/HomePage'

const App: React.FC = () => {
    return (
        <RMGraphQLProvider>
            <HashRouter>
                <Switch>
                    <Route
                        path="/"
                        exact
                        component={HomePage}
                    />
                    <Route
                        path="/Questions"
                        // exact
                        component={QuestionsPage}
                    />
                    {/*<Route*/}
                    {/*    path={`/*`}*/}
                    {/*    strict*/}
                    {/*    render={() => <Redirect to={`/Home`}/>}*/}
                    {/*/>*/}
                </Switch>

            </HashRouter>
        </RMGraphQLProvider>
    )
}

export default App
