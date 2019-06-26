import React from 'react'
import './App.less'
import { HashRouter, Switch, Route, Redirect } from 'react-router-dom'
import 'sanar-ui/dist/Config/i18n'
import { QuestionsPage } from './Pages/Questions/QuestionsPage'
import { HomePage } from './Pages/Home/HomePage'

const App: React.FC = () => {
    return (
                <HashRouter>
                    <Switch>
                        <Route
                            path={`/`}
                            exact
                            component={HomePage}
                        />
                        <Route
                            path={`/pratica`}
                            component={QuestionsPage}
                        />
                        <Route
                            path={`/pratica-curso/:videoParams`}
                            component={QuestionsPage}
                        />
                        <Route
                            path={`/*`}
                            strict
                            render={() => <Redirect to={`/`}/>}
                        />
                    </Switch>
                </HashRouter>
    )
}

export default App
