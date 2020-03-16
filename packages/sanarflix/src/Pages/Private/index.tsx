import React, { Suspense } from 'react'

import { Route, Switch, RouteComponentProps } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import { LastLocationProvider } from 'react-router-last-location'

import { SANErrorBoundary } from '@sanar/components'

import FLXLayout from 'Pages/Layout'
import FLXSplashLoader from 'Components/SplashLoader'
import FLXLayoutProvider from 'Pages/Layout/Context'
import FLXActiveAccountRoute from './ActiveAccountRoute'

import * as Sentry from '@sentry/browser';

const FLXHome = React.lazy(() => import('./Home'))
const FLXCourses = React.lazy(() => import('./Courses'))
const FLXCourse = React.lazy(() => import('./Course'))
const FLXClassroom = React.lazy(() => import('./Classroom'))
const FLXQuestionsDatabase = React.lazy(() => import('./QuestionsDatabase'))
const FLXAccount = React.lazy(() => import('./Account'))
const FLXAddedPage = React.lazy(() => import('./Added'))
const FLXExamsPage = React.lazy(() => import('./Exams'))
const FLXSearchPage = React.lazy(() => import('./Search'))
const FLXError500 = React.lazy(() => import('Components/Error500'))
const FLXError404 = React.lazy(() => import('Components/Error404'))

type FLXPrivatePages = {}

const FLXPrivatePages: React.FC<RouteComponentProps<FLXPrivatePages>> = ({
    history,
    match: { url }
}) => {
    const { t } = useTranslation('sanarflix')

    const reload = () => {
        history.push('/portal/inicio')
        window.location.reload()
    }

    const handleOnError = (error, errorInfo) => {
        Sentry.withScope((scope) => {
            scope.setExtras(errorInfo);
            Sentry.captureException(error);
        });
    }

    return (
        <SANErrorBoundary onClick={reload} text={t('global.backStart')} onError={handleOnError}>
            <LastLocationProvider>
                <FLXLayoutProvider>
                    <FLXLayout>
                        <Suspense
                            fallback={<FLXSplashLoader size='flexible' />}
                        >
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
                                    path={`${url}/curso/:courseId`}
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
                                    path={`${url}/adicionados`}
                                    component={FLXAddedPage}
                                />
                                <FLXActiveAccountRoute
                                    path={`${url}/provas`}
                                    component={FLXExamsPage}
                                />
                                <FLXActiveAccountRoute
                                    path={`${url}/busca`}
                                    component={FLXSearchPage}
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
                        </Suspense>
                    </FLXLayout>
                </FLXLayoutProvider>
            </LastLocationProvider>
        </SANErrorBoundary>
    )
}

export default FLXPrivatePages
