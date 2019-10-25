import React, { useState, useMemo, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { withRouter, RouteComponentProps } from 'react-router-dom'

import { useApolloClient } from '@apollo/react-hooks'

import ESSignInForm from 'sanar-ui/dist/Components/Organisms/SignInForm'
import ESAuthTemplate from 'sanar-ui/dist/Components/Templates/Auth'
import ESBrandHeader from 'sanar-ui/dist/Components/Atoms/BrandHeader'
import ESTypography from 'sanar-ui/dist/Components/Atoms/Typography'
import { ESRow, ESCol } from 'sanar-ui/dist/Components/Atoms/Grid'

import logo from 'Assets/images/brand/logo.svg'
import sanar from 'Assets/images/brand/sanar.svg'
import imageMarketing from 'Assets/images/auth/marketing.png'

import { login, getCognitoUser } from 'Config/AWSCognito'

const RMLogin: React.FC<RouteComponentProps> = ({ history }) => {
    const { t } = useTranslation('resmed')
    const client = useApolloClient()
    const [keepMeLoggedIn, setKeepMeLoggedIn] = useState(false)
    const [showModalTerms, setShowModalTerms] = useState(false)
    const [activeKey, setActiveKey] = useState(0)

    const marketing = {
        title: t('auth.marketing.title'),
        description: t('auth.marketing.description')
    }

    const action = () => {
        history.push('/portal')
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
        const cognitoUser = getCognitoUser()

        if (!!cognitoUser) {
            cognitoUser.getSession((_, session) => {
                if (session.isValid()) {
                    history.push('/portal')
                }
            })
        }
        return () => {
            client.cache.reset()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
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
                />
            }
        />
    )
}

export default withRouter(RMLogin)
