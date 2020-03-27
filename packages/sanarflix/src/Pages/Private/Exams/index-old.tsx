import React, { Suspense } from 'react'
import { withRouter, Switch, Route, Redirect } from 'react-router-dom'

import FLXSplashLoader from 'Components/SplashLoader'

const FLXExamsPractice = React.lazy(() => import('./Practice'))

const FLXExams = () => {
    return (
        <Suspense fallback={<FLXSplashLoader size='flexible' />}>
            <Switch>
                <Route
                    path='/portal/provas/pratica'
                    component={FLXExamsPractice}
                />
                <Route
                    path='*'
                    render={() => (
                        <Redirect to='/portal/provas/pratica/5d1f5ef5b8e15b0027500ca2' />
                    )}
                />
            </Switch>
        </Suspense>
    )
}

export default withRouter(FLXExams)
