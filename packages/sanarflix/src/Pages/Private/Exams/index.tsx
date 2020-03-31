import React, { Suspense, useEffect, useMemo } from 'react'
import { withRouter, Switch, Route, Redirect } from 'react-router-dom'

import FLXSplashLoader from 'Components/SplashLoader'
import { useQuery } from '@apollo/react-hooks'
import { GET_ME } from 'Apollo/User/Queries/me'
import FLXExamsProvider from './Context'
import FLXExamFilterProvider from 'Components/Exams/Filter/Context'
import { useAuthContext } from 'Hooks/auth'
import { useSnackbarContext } from '@sanar/components'
import { useTranslation } from 'react-i18next'

const FLXExamsPractice = React.lazy(() => import('./Practice'))
const FLXExamsOnBoarding = React.lazy(() => import('./OnBoarding'))
const InitialList = React.lazy(() => import('./InitialList'))
const FilteredList = React.lazy(() => import('./FilteredList'))

const FLXExams = ({ history }) => {
    const { data } = useQuery(GET_ME, { fetchPolicy: 'cache-only' })
    const { me } = useAuthContext()
    const snackbar = useSnackbarContext()
    const { t } = useTranslation('sanarflix')

    const InitialPage = useMemo(
        () =>
            data.me && data.me.userMedUniversity
                ? InitialList
                : FLXExamsOnBoarding,
        [data]
    )

    useEffect(() => {
        if (!me.enable_exam_feature) {
            snackbar({
                message: t('exams.notEnableFeature'),
                theme: 'warning'
            })
            history.push('/portal/inicio');
        }
    })

    return (
        <FLXExamsProvider medUniversity={data.me.userMedUniversity}>
            <FLXExamFilterProvider>
                <Suspense fallback={<FLXSplashLoader size='flexible' />}>
                    <Switch>
                        <Route
                            exact
                            path='/portal/provas'
                            component={InitialPage}
                        />
                        <Route
                            exact
                            path='/portal/provas/busca'
                            component={FilteredList}
                        />
                        <Route
                            path='/portal/provas/pratica'
                            component={FLXExamsPractice}
                        />
                        <Route
                            path='*'
                            render={() => <Redirect to='/portal/provas' />}
                        />
                    </Switch>
                </Suspense>
            </FLXExamFilterProvider>
        </FLXExamsProvider>
    )
}

export default withRouter(FLXExams)
