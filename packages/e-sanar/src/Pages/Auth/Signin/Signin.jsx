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

import ESModalTabs from 'sanar-ui/dist/Components/Organisms/ModalTabs'
import ESTypography from 'sanar-ui/dist/Components/Atoms/Typography'
import ESTermsAndPrivacy from 'assets/TermsAndPrivacy'

const content = [
    {
        title: 'Termos de Uso',
        content: <ESTermsAndPrivacy />
    }
]

const SANSigninPage = ({ history }) => {
    const { t } = useTranslation('esanar')

    const [showModalTerms, setShowModalTerms] = useState(false)
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
        <>
            <ESTypography>
                Ao entrar na plataforma, você concorda com nossos
            </ESTypography>
            <span onClick={() => setShowModalTerms(true)}> Termos de Uso </span>
            <ESTypography>e nossa</ESTypography>
            <span href='#' onClick={() => setShowModalTerms(true)}>
                {' '}
                Política de Privacidade
            </span>
        </>
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

            <ESModalTabs
                onCancel={() => setShowModalTerms(false)}
                visible={showModalTerms}
                content={content}
                scrolling
            />
        </div>
    )
}

export default SANSigninPage
