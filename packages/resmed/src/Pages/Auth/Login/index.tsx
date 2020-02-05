import React, { useState, useMemo } from 'react'

import { useTranslation } from 'react-i18next'
import { withRouter, RouteComponentProps } from 'react-router-dom'

import ESSignInForm from 'sanar-ui/dist/Components/Organisms/SignInForm'
import ESAuthTemplate from 'sanar-ui/dist/Components/Templates/Auth'
import ESBrandHeader from 'sanar-ui/dist/Components/Atoms/BrandHeader'
import ESTypography from 'sanar-ui/dist/Components/Atoms/Typography'
import { ESRow, ESCol } from 'sanar-ui/dist/Components/Atoms/Grid'

import { SANBox } from '@sanar/components'

import logo from 'Assets/images/brand/logo.svg'
import sanar from 'Assets/images/brand/sanar.svg'
import imageMarketing from 'Assets/images/auth/marketing.jpg'

import { login } from 'Config/AWSCognito'

import RMModalTermsAndPrivacy from 'Components/ModalTermsAndPrivacy'

import { segmentTrack } from 'Config/Segment/track'
import { IEvents, IOptions } from 'Config/Segment'

const RMLogin: React.FC<RouteComponentProps> = ({ history }) => {
    const { t } = useTranslation('resmed')
    const [keepMeLoggedIn, setKeepMeLoggedIn] = useState(false)
    const [showModalTerms, setShowModalTerms] = useState(false)
    const [activeKey, setActiveKey] = useState(0)

    trySetTokenAutoLoginFromLocationSearch(location.search)

    const handleTrack = (event: IEvents, attrs?: IOptions) => {
        const data = {
            'Plataform ID': process.env.REACT_APP_PLATFORM_ID,
            ...attrs
        }

        segmentTrack(event, data)
    }

    const action = response => {
        if (response.newPasswordRequired) {
            history.push('/auth/nova-senha')
        } else {
            history.push('/inicio/curso?ready=false')
        }
    }

    const onKeepMeLoggedIn = () => {
        setKeepMeLoggedIn(old => !old)
    }

    const modalTermsOpen = defaultKey => {
        setActiveKey(defaultKey)
        setShowModalTerms(true)
    }

    const terms = useMemo(
        () => (
            <ESRow type='flex' align='middle' justify='center'>
                <ESCol>
                    <SANBox as='img' src={sanar} alt='sanar' />
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
        [t]
    )

    const marketing = useMemo(
        () => ({
            title: t('auth.marketing.title'),
            description: t('auth.marketing.description'),
            linkDescription: t('auth.marketing.action'),
            link: 'https://www.sanarmed.com/residenciamedica/cursos/'
        }),
        [t]
    )
    return (
        <>
            <ESAuthTemplate
                image={imageMarketing}
                marketing={marketing}
                terms={terms}
                title={t('auth.hello')}
                description={t('auth.signInDescription')}
                header={<ESBrandHeader logo={logo} />}
                form={
                    <ESSignInForm
                        keepMeLoggedIn={t('auth.keepMeLoggedIn')}
                        forgotPassword={t('auth.forgotPassword')}
                        forgotPasswordLink={() =>
                            history.push('/auth/recuperar-senha')
                        }
                        login={t('auth.login')}
                        action={action}
                        isKeepMeLoggedChecked={keepMeLoggedIn}
                        keepMeLogged={onKeepMeLoggedIn}
                        signInByEmail={login}
                        track={handleTrack}
                    />
                }
            />

            <RMModalTermsAndPrivacy
                onCancel={() => {
                    setShowModalTerms(false)
                    setActiveKey(0)
                }}
                visible={showModalTerms}
                defaultActiveKey={activeKey}
                scrolling
            />
        </>
    )
}

export default withRouter(RMLogin)
