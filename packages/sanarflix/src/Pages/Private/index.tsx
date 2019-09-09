import React, { Suspense } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import { RouteComponentProps } from 'react-router'
import FLXLayout from 'Pages/Layout'
import FLXSplashLoader from 'Components/SplashLoader'
import FLXLayoutProvider from 'Pages/Layout/Context'

const FLXHome = React.lazy(() => import('./Home'))
const FLXCourses = React.lazy(() => import('./Courses'))
const FLXCourse = React.lazy(() => import('./Course'))
const FLXClassroom = React.lazy(() => import('./Classroom'))
const FLXQuestionsDatabase = React.lazy(() => import('./QuestionsDatabase'))

type FLXPrivatePages = {}

const FLXPrivatePages: React.FC<RouteComponentProps<FLXPrivatePages>> = ({
    match: { url }
}) => {
    return (
        <FLXLayoutProvider>
            <FLXLayout>
                <Suspense fallback={<FLXSplashLoader />}>
                    <Switch>
                        <Route path={`${url}/inicio`} component={FLXHome} />
                        <Route path={`${url}/cursos`} component={FLXCourses} />
                        <Route
                            path={`${url}/curso/:id`}
                            component={FLXCourse}
                        />
                        <Route
                            path={`${url}/sala-aula/:courseId/:themeId/:type/:resourceId`}
                            component={FLXClassroom}
                        />
                        <Route
                            path={`${url}/banco-questoes`}
                            component={FLXQuestionsDatabase}
                        />
                        <Route
                            path={[`${url}`, `${url}/`]}
                            render={() => <Redirect to={`${url}/inicio`} />}
                        />
                    </Switch>
                </Suspense>
            </FLXLayout>
        </FLXLayoutProvider>
    )
}

export default FLXPrivatePages
