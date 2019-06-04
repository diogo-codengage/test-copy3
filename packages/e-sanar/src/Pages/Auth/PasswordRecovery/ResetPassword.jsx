import React, { useState } from 'react'

import ESPasswordRecoveryTemplate from 'sanar-ui/dist/Components/Templates/PasswordRecovery'
import ESInput from 'sanar-ui/dist/Components/Atoms/Input'
import ESButton from 'sanar-ui/dist/Components/Atoms/Button'
import ESForm, {
    ESFormItem,
    withESForm
} from 'sanar-ui/dist/Components/Molecules/Form'

import image from 'assets/images/auth/chest.png'
import { esSendPasswordReset } from 'sanar-ui/dist/Util/Auth'

const SANResetPassword = ({ history, location, form }) => {
    const [loading, setLoading] = useState(false)
    const params = new URLSearchParams(location.search)

    const resetPassword = event => {
        event.preventDefault()

        form.validateFields()
            .then(res => {
                const { password } = form.getFieldsValue()
                setLoading(true)
                esSendPasswordReset(
                    password,
                    params.get('email'),
                    params.get('codigo')
                )
                    .then(() => {
                        setLoading(false)
                        history.push('../')
                    })
                    .catch(() => {
                        history.push('../recuperar-senha')
                        setLoading(false)
                    })
            })
            .catch(err => console.log(err))
    }

    const compareToFirstPassword = (rule, value, callback) => {
        if (value && value !== form.getFieldValue('password')) {
            callback('Two passwords that you enter is inconsistent!')
        } else {
            callback()
        }
    }

    return (
        <ESPasswordRecoveryTemplate
            title='Troque sua senha'
            subtitle='Cadastre uma nova senha preenchendo os campos abaixo:'
            image={image}
            actionsMargin='large'
            actions={
                <ESForm form={form} onSubmit={resetPassword}>
                    <ESFormItem
                        name='password'
                        rules={[
                            {
                                required: true,
                                message: 'Campo obrigatório.'
                            },
                            {
                                min: 6,
                                message:
                                    'A senha deve conter no mínimo seis caracteres.'
                            }
                        ]}
                    >
                        <ESInput
                            size='large'
                            component={ESInput.Password}
                            placeholder='Nova senha'
                        />
                    </ESFormItem>
                    <ESFormItem
                        name='passwordConfirm'
                        rules={[
                            {
                                required: true,
                                message: 'Campo obrigatório.'
                            },
                            {
                                validator: compareToFirstPassword,
                                message: 'As senhas não conferem.'
                            }
                        ]}
                    >
                        <ESInput
                            size='large'
                            component={ESInput.Password}
                            placeholder='Confirme sua senha'
                        />
                    </ESFormItem>

                    <ESButton
                        htmlType='submit'
                        uppercase
                        block
                        variant='solid'
                        color='primary'
                        className='mb-md'
                        loading={loading}
                    >
                        Enviar
                    </ESButton>
                    <ESButton
                        onClick={() => history.push('/')}
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

export default withESForm(SANResetPassword)
