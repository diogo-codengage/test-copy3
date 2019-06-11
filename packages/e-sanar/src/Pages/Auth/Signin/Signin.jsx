import React, { useState } from 'react'
import ESAuthTemplate from 'sanar-ui/dist/Components/Templates/Auth'
import ESSignInForm from 'sanar-ui/dist/Components/Organisms/SignInForm'
import esSignIn, {
    esFacebookSignIn,
    esGoogleSignIn,
    esConfigureAuthStorage
} from 'sanar-ui/dist/Util/Auth'

import image from 'assets/images/auth/login.png'

import useLocalStorage from 'sanar-ui/dist/Hooks/useLocalStorage'
import { useTranslation } from 'react-i18next'

const SANSigninPage = ({ history }) => {
    const { t } = useTranslation('esanar')

    const [storedValue, setValue] = useLocalStorage('es-keep-me-logged-in')
    const [isKeepMeLoggedChecked, setIsKeepMeLoggedChecked] = useState(
        storedValue
    )
    const action = () => {
        history.push('/aluno')
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

    return (
        <ESAuthTemplate
            image={image}
            description={t('auth.signInDescription')}
            marketing={marketing}
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
                />
            }
        />
    )
}

export default SANSigninPage
