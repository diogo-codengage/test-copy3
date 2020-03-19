import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import ESAuthTemplate from 'sanar-ui/dist/Components/Templates/Auth'
import ESSignInForm from 'sanar-ui/dist/Components/Organisms/SignInForm'
import esSignIn, {
    esFacebookSignIn,
    esGoogleSignIn,
    esConfigureAuthStorage
} from 'sanar-ui/dist/Util/Auth'

import image from 'assets/images/auth/login.png'

import useLocalStorage from 'sanar-ui/dist/Hooks/useLocalStorage'

import SANModalTermsAndPrivacy from 'Components/ModalTermsAndPrivacy'
import ESTypography from 'sanar-ui/dist/Components/Atoms/Typography'

const SANSigninPage = ({ history }) => {
    const { t } = useTranslation('esanar')

    const [showModalTerms, setShowModalTerms] = useState(false)
    const [activeKey, setActiveKey] = useState('0')
    const [storedValue, setValue] = useLocalStorage('es-keep-me-logged-in')
    const [isKeepMeLoggedChecked, setIsKeepMeLoggedChecked] = useState(
        storedValue
    )
    const action = response => {
        history.push('/aluno')
        if (window.Conpass) {
            window.Conpass.init({
                name: response.attributes.name,
                email: response.attributes.email
            })
        }
    }

    const modalTermsOpen = defaultKey => {
        setActiveKey(defaultKey)
        setShowModalTerms(true)
    }

    const storeKeepMeLoggedIn = () => {
        if (storedValue) {
            setIsKeepMeLoggedChecked(false)
            setValue(false)
        } else {
            setValue(true)
            setIsKeepMeLoggedChecked(true)
        }

        esConfigureAuthStorage()
    }

    const marketing = {
        title: t('auth.marketing.title'),
        description: t('auth.marketing.description'),
        linkDescription: t('auth.marketing.linkDescription'),
        link: 'https://www.editorasanar.com.br/'
    }

    const Terms = () => (
        <ESTypography className='text-align-center'>
            {t('auth.footer.onEnter')}
            <span onClick={() => modalTermsOpen('0')}>
                {t('global.termsOfUse')}
            </span>
            {t('auth.footer.us')}
            <span href='#' onClick={() => modalTermsOpen('1')}>
                {t('global.privacyPolicy')}
            </span>
        </ESTypography>
    )

    return (
        <div className='san-signin'>
            <ESAuthTemplate
                image={image}
                description={t('auth.signInDescription')}
                marketing={marketing}
                terms={<Terms />}
                form={
                    <ESSignInForm
                        keepMeLoggedIn={t('auth.keepMeLoggedIn')}
                        forgotPassword={t('auth.forgotPassword')}
                        login={t('auth.login')}
                        title={t('auth.title')}
                        action={action}
                        isKeepMeLoggedChecked={isKeepMeLoggedChecked}
                        keepMeLogged={storeKeepMeLoggedIn}
                        signInByEmail={esSignIn}
                        signInByFacebook={esFacebookSignIn}
                        signInByGoogle={esGoogleSignIn}
                        facebookKey={process.env.REACT_APP_FACEBOOK_KEY}
                        googleKey={process.env.REACT_APP_GOOGLE_KEY}
                    />
                }
            />

            <SANModalTermsAndPrivacy
                onCancel={() => {
                    setShowModalTerms(false)
                    setActiveKey(0)
                }}
                visible={showModalTerms}
                defaultActiveKey={activeKey}
                scrolling
            />
        </div>
    )
}

export default SANSigninPage
