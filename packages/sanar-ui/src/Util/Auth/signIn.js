import { Auth } from 'aws-amplify'

const formValidation = form => {
    return form.validateFields().catch(() => {
        return Promise.reject({ message: 'Por favor, digite dados válidos.' })
    })
}

const esSignIn = form => {
    return formValidation(form).then(() => {
        const { email, password } = form.getFieldsValue()

        return Auth.signIn(email, password)
            .then(res => console.log(res))
            .catch(err => {
                debugger
                switch (err.code) {
                    case 'UserNotFoundException':
                        return Promise.reject({
                            message:
                                'Desculpe, não encontramos nenhuma conta associada ao e-mail inserido. Por favor tente novamente.',
                            field: 'email'
                        })
                    case 'NotAuthorizedException':
                        return Promise.reject({
                            message:
                                'Desculpe, essa combinação inserida de e-mail e senha está incorreta. Verifique seus dados e tente novamente!'
                        })
                    default:
                        return Promise.reject({
                            message: 'Verifique seus dados de login!'
                        })
                }
            })
    })
}

export default esSignIn
