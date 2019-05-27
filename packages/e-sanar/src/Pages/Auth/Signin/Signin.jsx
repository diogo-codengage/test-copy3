import React from 'react'
import ESAuthTemplate from 'sanar-ui/dist/Components/Templates/Auth'
import ESSignInForm from 'sanar-ui/dist/Components/Organisms/SignInForm'

import image from 'assets/images/auth/login.png'

const SANSigninPage = ({ history }) => {
    const action = user => {
        history.push('/aluno')
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
                />
            }
        />
    )
}

export default SANSigninPage
