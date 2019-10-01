import React, { Suspense, useEffect } from 'react'

import { Route, Switch, Redirect, RouteComponentProps } from 'react-router-dom'
import { useApolloClient } from '@apollo/react-hooks'

import FLXLayout from 'Pages/Layout'
import FLXSplashLoader from 'Components/SplashLoader'
import FLXLayoutProvider from 'Pages/Layout/Context'
import FLXActiveAccountRoute from './ActiveAccountRoute'

import { GET_ME } from 'Apollo/User/Queries/me'
import { useAuthContext } from 'Hooks/auth'

const FLXHome = React.lazy(() => import('./Home'))
const FLXCourses = React.lazy(() => import('./Courses'))
const FLXCourse = React.lazy(() => import('./Course'))
const FLXClassroom = React.lazy(() => import('./Classroom'))
const FLXQuestionsDatabase = React.lazy(() => import('./QuestionsDatabase'))
const FLXSearchPage = React.lazy(() => import('./Search'))
const FLXAccount = React.lazy(() => import('./Account'))
const FLXAddedPage = React.lazy(() => import('./Added'))

type FLXPrivatePages = {}

const FLXPrivatePages: React.FC<RouteComponentProps<FLXPrivatePages>> = ({
    history,
    match: { url }
}) => {
    const client = useApolloClient()
    const { setMe } = useAuthContext()

    useEffect(() => {
        const fetchMe = async () => {
            try {
                const {
                    data: { me }
                } = await client.query({ query: GET_ME })
                setMe(me)
            } catch {
                history.push('/auth/signin')
            }
        }
        fetchMe()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <FLXLayoutProvider>
            <FLXLayout>
                <Suspense fallback={<FLXSplashLoader size='flexible' />}>
                    <Switch>
                        <FLXActiveAccountRoute
                            path={`${url}/inicio`}
                            component={FLXHome}
                        />
                        <FLXActiveAccountRoute
                            path={`${url}/cursos`}
                            component={FLXCourses}
                        />
                        <FLXActiveAccountRoute
                            path={`${url}/curso/:id`}
                            component={FLXCourse}
                        />
                        <FLXActiveAccountRoute
                            path={`${url}/sala-aula/:courseId/:themeId/:type/:resourceId`}
                            component={FLXClassroom}
                        />
                        <FLXActiveAccountRoute
                            path={`${url}/banco-questoes`}
                            component={FLXQuestionsDatabase}
                        />
                        <FLXActiveAccountRoute
                            path={`${url}/busca`}
                            component={FLXSearchPage}
                        />
                        <FLXActiveAccountRoute
                            path={`${url}/adicionados`}
                            component={FLXAddedPage}
                        />
                        <Route
                            path={`${url}/minha-conta`}
                            component={FLXAccount}
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
