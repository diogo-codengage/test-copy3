import React, { useState } from 'react'

import ESPasswordRecoveryTemplate from 'sanar-ui/dist/Components/Templates/PasswordRecovery'
import ESInput from 'sanar-ui/dist/Components/Atoms/Input'
import ESButton from 'sanar-ui/dist/Components/Atoms/Button'

import image from 'assets/images/auth/searching.png'
import { Auth } from 'aws-amplify'
import ESForm, {
    ESFormItem,
    withESForm
} from 'sanar-ui/dist/Components/Molecules/Form'

const SANSendPasswordRecovery = ({ history, form }) => {
    const [loading, setLoading] = useState(false)

    const forgotPassword = event => {
        event.preventDefault()
        setLoading(true)

        form.validateFields()
            .then(() => {
                const { email } = form.getFieldsValue()

                Auth.forgotPassword(email)
                    .then(() => {
                        setLoading(false)
                        history.push({
                            pathname: 'recuperar-senha/sucesso',
                            search: `?email=${email}`
                        })
                    })
                    .catch(() => {
                        setLoading(false)
                    })
            })
            .catch(() => {
                setLoading(false)
            })
    }

    return (
        <ESPasswordRecoveryTemplate
            title='Esqueci minha senha'
            subtitle='Preencha o campo abaixo e nós te enviaremos um link de recuperação alteração de senha'
            image={image}
            actionsMargin='large'
            actions={
                <ESForm form={form} onSubmit={forgotPassword}>
                    <ESFormItem
                        rules={[
                            {
                                required: true,
                                message: 'Por favor, preencha seu e-mail.'
                            },
                            {
                                type: 'email',
                                message: 'Por favor, insira um e-mail válido.'
                            }
                        ]}
                        name='email'
                    >
                        <ESInput
                            size='large'
                            placeholder='Digite seu e-mail cadastrado'
                        />
                    </ESFormItem>
                    <ESButton
                        htmlType='submit'
                        uppercase
                        block
                        variant='solid'
                        color='primary'
                        loading={loading}
                        className='mb-md'
                    >
                        Enviar
                    </ESButton>
                    <ESButton
                        href='../'
                        uppercase
                        block
                        variant='text'
                        color='primary'
                    >
                        Acessar conta
                    </ESButton>
                </ESForm>
            }
        />
    )
}

export default withESForm()(SANSendPasswordRecovery)
