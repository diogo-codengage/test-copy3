import React, { Suspense, useEffect, useState } from 'react'

import { Route, Switch, RouteComponentProps } from 'react-router-dom'
import { useApolloClient } from '@apollo/react-hooks'
import { useTranslation } from 'react-i18next'

import { SANErrorBoundary } from '@sanar/components'

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
const FLXError500 = React.lazy(() => import('Components/Error500'))
const FLXError404 = React.lazy(() => import('Components/Error404'))

type FLXPrivatePages = {}

const FLXPrivatePages: React.FC<RouteComponentProps<FLXPrivatePages>> = ({
    history,
    match: { url }
}) => {
    const client = useApolloClient()
    const { t } = useTranslation('sanarflix')
    const { setMe } = useAuthContext()
    const [loading, setLoading] = useState(false)

    const reload = () => {
        history.push('/portal/inicio')
        window.location.reload()
    }

    useEffect(() => {
        const fetchMe = async () => {
            setLoading(true)
            try {
                const {
                    data: { me }
                } = await client.query({ query: GET_ME })
                setMe(me)
            } catch {
                history.push('/auth/signin')
            }
            setLoading(false)
        }
        fetchMe()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <SANErrorBoundary onClick={reload} text={t('global.backStart')}>
            <FLXLayoutProvider>
                <FLXLayout>
                    <Suspense fallback={<FLXSplashLoader size='flexible' />}>
                        {!loading ? (
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
                                    path={`${url}/erro`}
                                    component={FLXError500}
                                />
                                <Route component={FLXError404} />
                            </Switch>
                        ) : (
                            <FLXSplashLoader size='flexible' />
                        )}
                    </Suspense>
                </FLXLayout>
            </FLXLayoutProvider>
        </SANErrorBoundary>
    )
}

export default FLXPrivatePages
