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

const SANSigninPage = ({ history }) => {
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

    return (
        <ESAuthTemplate
            image={image}
            description='Sua conta é seu portal de acesso a cursos e
            todas as ferramentas necessárias para
            impulsionar a sua carreira'
            form={
                <ESSignInForm
                    keepMeLoggedIn='Manter-me logado'
                    forgotPassword='Esqueci minha senha'
                    login='Entrar'
                    title='Ou entre com os dados abaixo'
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
