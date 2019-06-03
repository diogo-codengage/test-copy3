import React, { useState } from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import { ESRow, ESCol } from '../../Atoms/Grid'
import ESButton from '../../Atoms/Button'
import ESIcon from '../../Atoms/Icon'
import ESDivider from '../../Atoms/Divider'
import ESInput from '../../Atoms/Input'
import ESCheckbox from '../../Atoms/Checkbox'
import ESTypography from '../../Atoms/Typography'
import ESGoogleSignIn from './GoogleSignIn'
import ESFacebookSignIn from './FacebookSignIn'
import ESForm, { ESFormItem, withESForm } from '../../Molecules/Form'
import { message, Spin } from 'antd'
import esSignIn from '../../../Util/Auth/signIn'
import { esSignInByFacebook } from '../../../Util/Auth/facebookSignIn'
import { esSignInByGoogle } from '../../../Util/Auth/googleSignIn'

const antIcon = <ESIcon type='loading' style={{ fontSize: 24 }} spin />

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
    const [invalidEmail, setInvalidEmail] = useState(false)

    const signIn = e => {
        e.preventDefault()
        setLoading(true)
        esSignIn(form)
            .then(() => {
                setLoading(false)
                return actProp()
            })
            .catch(error => {
                setLoading(false)
                if (error.field === 'email') {
                    setInvalidEmail(true)
                }
                message.error(error.message)
            })
    }

    const signInFacebook = () => {
        setLoading(true)
        esSignInByFacebook()
            .then(() => {
                setLoading(false)
                return actProp()
            })
            .catch(() => {
                setLoading(false)
                message.error(
                    'Ocorreu um erro ao logar-se utilizando o Facebook.'
                )
            })
    }

    const signInGoogle = async () => {
        setLoading(true)
        esSignInByGoogle()
            .then(() => {
                setLoading(false)
                actProp()
            })
            .catch(() => {
                setLoading(false)
            })
    }

    const validator = () =>
        !!(!form.isFieldTouched('email') || !form.isFieldTouched('password'))

    return (
        <div className={classes}>
            <Spin indicator={antIcon} spinning={loading}>
                <ESForm
                    form={form}
                    onSubmit={signIn}
                    customValidator={validator()}
                >
                    <ESRow className='es-sign-in-form--social' gutter={16}>
                        <ESCol xs={24} sm={12}>
                            <ESFacebookSignIn
                                signIn={signInFacebook}
                                className='mb-md'
                            />
                        </ESCol>
                        <ESCol xs={24} sm={12}>
                            <ESGoogleSignIn
                                signIn={signInGoogle}
                                className='mb-lg'
                            />
                        </ESCol>
                    </ESRow>
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
                        block
                        bold
                    >
                        {login}
                    </ESButton>
                </ESForm>
            </Spin>
        </div>
    )
}

ESSignInForm.propTypes = {
    className: PropTypes.string
}
ESSignInForm.defaultProps = {}

export default withESForm(ESSignInForm)
