import React, { useState } from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import { ESRow, ESCol } from '../../Atoms/Grid'
import ESButton from '../../Atoms/Button'
import ESDivider from '../../Atoms/Divider'
import ESInput from '../../Atoms/Input'
import ESCheckbox from '../../Atoms/Checkbox'
import ESTypography from '../../Atoms/Typography'
import ESGoogleSignIn from './GoogleSignIn'
import ESFacebookSignIn from './FacebookSignIn'
import { Auth } from 'aws-amplify'
import { withSignInFormProvider, useSignInFormContext } from './context'
import ESForm, { ESFormItem, withESForm } from '../../Molecules/Form'
import { message } from 'antd'

const ESSignInForm = ({
    className,
    keepMeLoggedIn,
    forgotPassword,
    login,
    title,
    action: actProp,
    form
}) => {
    const classes = classNames('es-sign-in-form', className)
    const [loading, setLoading] = useState(false)
    const { user, setUser } = useSignInFormContext()

    const signIn = e => {
        e.preventDefault()
        setLoading(true)
        form.validateFields()
            .then(res => {
                const { email, password } = form.getFieldsValue()
                Auth.signIn(email, password)
                    .then(user => {
                        setLoading(false)
                        return actProp(user)
                    })
                    .catch(err => {
                        setLoading(false)
                        switch (err.code) {
                            case 'UserNotFoundException':
                                message.error(
                                    'Desculpe, não encontramos nenhuma conta associada ao e-mail inserido. Por favor tente novamente.'
                                )
                                break
                            case 'NotAuthorizedException':
                                message.error(
                                    'Desculpe, essa combinação inserida de e-mail e senha está incorreta. Verifique seus dados e tente novamente!'
                                )
                            default:
                                message.error('Verifique seus dados de login!')
                        }
                    })
            })
            .catch(() => {
                setLoading(false)
                message.error('Por favor, digite dados válidos.')
            })
    }

    return (
        <div className={classes}>
            <ESForm form={form} onSubmit={signIn}>
                <ESRow className='es-sign-in-form--social' gutter={16}>
                    <ESCol xs={24} sm={12}>
                        <ESFacebookSignIn className='mb-md' />
                    </ESCol>
                    <ESCol xs={24} sm={12}>
                        <ESGoogleSignIn className='mb-lg' />
                    </ESCol>
                </ESRow>

                <div className='es-sign-in-form__form mb-lg'>
                    <ESDivider className='mb-lg'>
                        <ESTypography variant='subtitle2'>{title}</ESTypography>
                    </ESDivider>
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
                        <ESInput size='large' placeholder='Usuário' />
                    </ESFormItem>
                    <ESFormItem
                        name='password'
                        rules={[
                            {
                                required: true,
                                whitespace: true,
                                message: 'Por favor, preencha sua senha.'
                            }
                        ]}
                    >
                        <ESInput
                            size='large'
                            placeholder='Senha'
                            component={ESInput.Password}
                        />
                    </ESFormItem>
                    <ESRow
                        type='flex'
                        justify='space-between'
                        align='middle'
                        className='mb-lg es-sign-in-form__form--extra'
                    >
                        <ESCol>
                            <ESCheckbox>{keepMeLoggedIn}</ESCheckbox>
                        </ESCol>
                        <ESCol>
                            <ESButton
                                href='/#/auth/recuperar-senha'
                                variant='text'
                                bold
                                color='primary'
                            >
                                {forgotPassword}
                            </ESButton>
                        </ESCol>
                    </ESRow>
                    <ESButton
                        htmlType='submit'
                        uppercase
                        color='primary'
                        variant='solid'
                        loading={loading}
                        block
                        bold
                    >
                        {login}
                    </ESButton>
                    {user && user.attributes.name}
                </div>
            </ESForm>
        </div>
    )
}

ESSignInForm.propTypes = {
    className: PropTypes.string
}
ESSignInForm.defaultProps = {}

export default withESForm()(withSignInFormProvider(ESSignInForm))
