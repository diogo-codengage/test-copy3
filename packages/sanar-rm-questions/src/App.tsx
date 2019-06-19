import React from 'react'
import './App.less'
import { RMGraphQLProvider } from './Apollo/GraphQLService'
import { HashRouter, Switch, Route, Redirect } from 'react-router-dom'
import 'sanar-ui/dist/Config/i18n'
import { QuestionsPage } from './Pages/Questions/QuestionsPage'
import { HomePage } from './Pages/Home/HomePage'
import { AuthContextProvider } from './AuthContext'

const App: React.FC = () => {
    return (
        <RMGraphQLProvider>
            <AuthContextProvider>
                <HashRouter>
                    <Switch>
                        <Route
                            path={`/`}
                            exact
                            component={HomePage}
                        />
                        <Route
                            path={`/pratica`}
                            // exact
                            component={QuestionsPage}
                        />
                        <Route
                            path={`/pratica-curso/:videoParams`}
                            // exact
                            component={QuestionsPage}
                        />
                        <Route
                            path={`/*`}
                            strict
                            render={() => <Redirect to={`/`}/>}
                        />
                    </Switch>
                </HashRouter>
            </AuthContextProvider>
        </RMGraphQLProvider>
    )
}

export default App
