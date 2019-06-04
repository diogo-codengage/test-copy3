import { message } from 'antd'
import { Auth } from 'aws-amplify'

const sendPasswordReset = (password, email, code) => {
    return Auth.forgotPasswordSubmit(email, code, password)
        .then(res => {
            message.success('Senha alterada com sucesso!')
            return Promise.resolve()
        })
        .catch(err => {
            switch (err.code) {
                case 'ExpiredCodeException':
                    message.error(
                        'O código de redefinição inválido. Solicite um novo.'
                    )
                    break
                case 'CodeMismatchException':
                    message.error(
                        'O código de redefinição expirou. Solicite um novo.'
                    )
                    break
                case 'LimitExceededException':
                    message.error(
                        'Você excedeu o límite de tentativas. Tente novamente mais tarde.'
                    )
                    break
                default:
                    message.error(
                        'Ocorreu um erro ao alterar sua senha. Tente novamente em instantes.'
                    )
                    break
            }

            return Promise.reject()
        })
}

export default sendPasswordReset
