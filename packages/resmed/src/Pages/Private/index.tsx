import React, { Suspense } from 'react'

import { RouteComponentProps, Switch, Route, Redirect } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import { SANErrorBoundary } from '@sanar/components'

import RMSplashLoader from 'Components/SplashLoader'
import RMLayoutProvider from 'Pages/Private/Layout/Context'
import RMMainProvider from 'Pages/Private/Context'
import RMLayout from 'Pages/Private/Layout'

const RMHome = React.lazy(() => import('Pages/Private/Home'))
const RMSpecialty = React.lazy(() => import('Pages/Private/Specialty'))
const RMHelpCenter = React.lazy(() => import('Pages/Private/HelpCenter'))
const RMAccount = React.lazy(() => import('Pages/Private/Account'))
const RMPracticalArea = React.lazy(() => import('Pages/Private/PracticalArea'))
const RMClassroom = React.lazy(() => import('Pages/Private/Classroom'))
const RMLives = React.lazy(() => import('Pages/Private/Lives'))

const RMPrivatePages: React.FC<RouteComponentProps> = ({
    history,
    match: { url }
}) => {
    const { t } = useTranslation('resmed')

    const reload = () => {
        history.push('/inicio')
        window.location.reload()
    }

    return (
        <SANErrorBoundary onClick={reload} text={t('global.backStart')}>
            <RMMainProvider>
                <RMLayoutProvider>
                    <RMLayout>
                        <Suspense fallback={<RMSplashLoader />}>
                            <Switch>
                                <Route
                                    path={`${url}/curso`}
                                    component={RMHome}
                                />
                                <Route
                                    path={`${url}/subespecialidades/:specialtyId`}
                                    component={RMSpecialty}
                                />
                                <Route
                                    path={`${url}/central-ajuda`}
                                    component={RMHelpCenter}
                                />
                                <Route
                                    path={`${url}/minha-conta`}
                                    component={RMAccount}
                                />
                                <Route
                                    path={`${url}/area-pratica`}
                                    component={RMPracticalArea}
                                />
                                <Route
                                    path={`${url}/lives`}
                                    component={RMLives}
                                />
                                <Route
                                    path={[
                                        `${url}/sala-aula/:specialtyId/:subspecialtyId/:lessonId/:collectionId/:type/:contentId`,
                                        `${url}/sala-aula/:specialtyId/:lessonId/:collectionId/:type/:contentId`,
                                        `${url}/sala-aula/:specialtyId/:subspecialtyId/:lessonId/:status`,
                                        `${url}/sala-aula/:specialtyId/:lessonId/:status`
                                    ]}
                                    component={RMClassroom}
                                />
                                <Route
                                    path={[`${url}/`, `${url}`]}
                                    render={() => (
                                        <Redirect to={`${url}/curso`} />
                                    )}
                                />
                            </Switch>
                        </Suspense>
                    </RMLayout>
                </RMLayoutProvider>
            </RMMainProvider>
        </SANErrorBoundary>
    )
}

export default RMPrivatePages
