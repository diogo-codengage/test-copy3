import React from 'react'
import './App.less'
import { HashRouter, Switch, Route, Redirect } from 'react-router-dom'
import 'sanar-ui/dist/Config/i18n'
import { HomePage } from './Pages/Home/HomePage'
import { HealthCheck } from './Pages/HealthCheck/HealthCheck'
import { QuestionsFromCoursePage } from './Pages/Questions/QuestionsPageFromCouse'
import { QuestionsPage } from './Pages/Questions/QuestionsPage'

const App: React.FC = () => {

    return (
        <HashRouter>
            <Switch>
                <Route
                    path={`/`}
                    exact
                    component={HomePage}
                    // render={() =>}
                />
                <Route
                    path={`/pratica`}
                    component={QuestionsPage}
                />
                <Route
                    path={`/pratica-curso/:videoParams`}
                    component={QuestionsFromCoursePage}
                />
                <Route
                    path={`/health`}
                    exact
                    component={HealthCheck}
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

