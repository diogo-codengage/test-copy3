import React, { Suspense } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import FLXExamsPracticeProvider from './Context'
import FLXSplashLoader from 'Components/SplashLoader'

const FLXExamsPracticePage = React.lazy(() => import('./Practice'))
const FLXExamsFinishedPracticePage = React.lazy(() => import('./Finished'))

const FLXExamsPractice = () => {
    return (
        <Suspense fallback={<FLXSplashLoader size='flexible' />}>
            <FLXExamsPracticeProvider>
                <Switch>
                    <Route
                        exact
                        path='/portal/provas/pratica/finalizada'
                        component={FLXExamsFinishedPracticePage}
                    />
                    <Route
                        path='/portal/provas/pratica/:id'
                        component={FLXExamsPracticePage}
                    />
                    <Route
                        path='*'
                        render={() => (
                            <Redirect to='/portal/provas/pratica/5d1f5ef5b8e15b0027500ca2' />
                        )}
                    />
                </Switch>
            </FLXExamsPracticeProvider>
        </Suspense>
    )
}

export default FLXExamsPractice
