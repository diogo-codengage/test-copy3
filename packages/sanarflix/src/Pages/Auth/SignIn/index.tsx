import React, { useState, useMemo, useEffect } from 'react'
import ReactGA from 'react-ga'
import { useTranslation } from 'react-i18next'
import { withRouter, Redirect, RouteComponentProps } from 'react-router-dom'

import { useApolloClient } from '@apollo/react-hooks'

import signInByEmail from './signIn'

import ESSignInForm from 'sanar-ui/dist/Components/Organisms/SignInForm'
import ESAuthTemplate from 'sanar-ui/dist/Components/Templates/Auth'
import ESBrandHeader from 'sanar-ui/dist/Components/Atoms/BrandHeader'
import ESTypography from 'sanar-ui/dist/Components/Atoms/Typography'
import { ESRow, ESCol } from 'sanar-ui/dist/Components/Atoms/Grid'

import FLXSplashLoader from 'Components/SplashLoader'
import FLXModalTermsAndPrivacy from 'Components/ModalTermsAndPrivacy'

import logo from 'Assets/images/brand/logo.svg'
import sanar from 'Assets/images/brand/sanar.svg'
import imageMarketing from 'Assets/images/auth/marketing.png'

import { getInstance } from 'Config/AWSCognito'
import { events } from 'Config/Segment'
import { trySetTokenAutoLoginFromLocationSearch } from './autoLoginSetToken'

const FLXSignIn: React.FC<RouteComponentProps> = ({ history, location }) => {
    const { t } = useTranslation('sanarflix')
    const client = useApolloClient()
    const [keepMeLoggedIn, setKeepMeLoggedIn] = useState(false)
    const [showModalTerms, setShowModalTerms] = useState(false)
    const [activeKey, setActiveKey] = useState(0)
    const [session, setSession] = useState({
        isValid: false,
        loading: true
    })
    const params = new URLSearchParams(location.search)
    useEffect(() => {
        trySetTokenAutoLoginFromLocationSearch(params)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const marketing = {
        title: t('auth.marketing.title'),
        description: t('auth.marketing.description')
    }

    const action = data => {
        const userIdentity = {
            name: data.idToken.name,
            email: data.idToken.email
        }
        ReactGA.set(userIdentity)
        console.log('Entra aqui');
        window.analytics.identify(userIdentity)
        history.push('/portal/inicio')
    }

    const modalTermsOpen = defaultKey => {
        setActiveKey(defaultKey)
        setShowModalTerms(true)
    }

    const onKeepMeLoggedIn = () => {
        setKeepMeLoggedIn(old => !old)
    }

    const Terms = useMemo(
        () => (
            <ESRow type='flex' align='middle' justify='center'>
                <ESCol>
                    <img src={sanar} alt='sanar' />
                </ESCol>
                <ESCol md={18}>
                    <ESTypography>
                        {t('auth.footer.onEnter')}
                        <span onClick={() => modalTermsOpen('0')}>
                            {t('global.termsOfUse')}
                        </span>
                        {t('auth.footer.us')}
                        <span onClick={() => modalTermsOpen('1')}>
                            {t('global.privacyPolicy')}
                        </span>
                    </ESTypography>
                </ESCol>
            </ESRow>
        ),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        []
    )

    useEffect(() => {
        const config = getInstance()
        const cognitoUser = config.userPool.getCurrentUser()

        if (!!cognitoUser) {
            cognitoUser.getSession(async (_, session) => {
                if (session && session.isValid()) {
                    setSession({
                        loading: false,
                        isValid: true
                    })
                } else {
                    setSession({
                        loading: false,
                        isValid: false
                    })
                }
            })
        } else {
            setSession({
                loading: false,
                isValid: false
            })
        }
        return () => {
            client.cache.reset()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        window.analytics.page(
            events['Page Viewed'].event,
            events['Page Viewed'].data
        )
    }, [])

    if (session.loading) {
        return <FLXSplashLoader />
    }

    if (!session.loading && session.isValid) {
        return <Redirect to='/portal/inicio' />
    }

    return (
        <>
            <ESAuthTemplate
                image={imageMarketing}
                marketing={marketing}
                terms={Terms}
                description={t('auth.signInDescription')}
                header={<ESBrandHeader logo={logo} />}
                form={
                    <ESSignInForm
                        keepMeLoggedIn={t('auth.keepMeLoggedIn')}
                        forgotPassword={t('auth.forgotPassword')}
                        login={t('auth.login')}
                        action={action}
                        isKeepMeLoggedChecked={keepMeLoggedIn}
                        keepMeLogged={onKeepMeLoggedIn}
                        signInByEmail={signInByEmail}
                    />
                }
            />

            <FLXModalTermsAndPrivacy
                onCancel={() => setShowModalTerms(false)}
                visible={showModalTerms}
                defaultActiveKey={activeKey}
                scrolling
            />
        </>
    )
}

export default withRouter(FLXSignIn)
