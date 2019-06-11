import React from 'react'
import './App.less'
import { RMGraphQLProvider } from './Apollo/GraphQLService'
import { QuestionPage } from './Pages/Questions/Questions'
import { HashRouter, Switch, Route, Redirect } from 'react-router-dom'
import { FooPage } from './Pages/Foo'
import { FilterPage } from './Pages/Questions/Filter/Filter'


const App: React.FC = () => {
  return (
      <RMGraphQLProvider>
          <HashRouter>
              <Route
                  path=""
                  component={FooPage}
              >
              </Route>
              {/*<Route*/}
              {/*    path="/Question"*/}
              {/*    component={QuestionPage}*/}
              {/*></Route>*/}
              {/*<Switch>*/}
              {/*    <Route*/}
              {/*        path="/Question/Filter"*/}
              {/*        component={FilterPage}*/}
              {/*    >*/}
              {/*    </Route>*/}
              {/*</Switch>*/}
          </HashRouter>
      </RMGraphQLProvider>

  );
}

export default App;
