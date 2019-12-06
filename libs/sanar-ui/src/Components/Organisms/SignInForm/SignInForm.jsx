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
import { useTranslation } from 'react-i18next'

const antIcon = <ESIcon type='loading' style={{ fontSize: 24 }} spin />

const ESSignInForm = ({
    className,
    keepMeLoggedIn,
    forgotPassword,
    login,
    title,
    action: actProp,
    signInByEmail,
    signInByFacebook,
    signInByGoogle,
    isKeepMeLoggedChecked,
    keepMeLogged,
    facebookKey,
    googleKey,
    form,
    track = null
}) => {
    const { t } = useTranslation('sanarui')
    const classes = classNames('es-sign-in-form', className)
    const [loading, setLoading] = useState(false)

    const signIn = e => {
        e.preventDefault()
        setLoading(true)
        form.validateFields((err, { email, password }) => {
            if (!err) {
                signInByEmail(email, password)
                    .then(response => {
                        track &&
                            track('Login success', {
                                Email: email
                            })
                        setLoading(false)
                        actProp(response)
                    })
                    .catch(error => {
                        track &&
                            track('Login failed', {
                                Email: email
                            })
                        setLoading(false)
                        message.error(error.message)
                    })
            } else {
                setLoading(false)
            }
        })
    }

    const signInFacebook = () => {
        setLoading(true)
        signInByFacebook()
            .then(() => {
                setLoading(false)
                actProp()
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
        signInByGoogle()
            .then(() => {
                ~setLoading(false)
                actProp()
            })
            .catch(() => {
                setLoading(false)
                message.error(
                    'Ocorreu um erro ao logar-se utilizando o Facebook.'
                )
            })
    }

    return (
        <div className={classes}>
            <Spin indicator={antIcon} spinning={loading}>
                <ESForm form={form} onSubmit={signIn}>
                    {/* <ESRow className='es-sign-in-form--social' gutter={16}>
                        <ESCol xs={24} sm={12}>
                            <ESFacebookSignIn
                                signIn={signInFacebook}
                                facebookKey={facebookKey}
                                className='mb-md'
                            />
                        </ESCol>
                        <ESCol xs={24} sm={12}>
                            <ESGoogleSignIn
                                signIn={signInGoogle}
                                googleKey={googleKey}
                                className='mb-lg'
                            />
                        </ESCol>
                    </ESRow>
                    <ESDivider className='mb-lg'>
                        <ESTypography variant='subtitle2'>{title}</ESTypography>
                    </ESDivider> */}
                    <ESFormItem
                        rules={[
                            {
                                required: true,
                                message: t('formValidateMessages.required')
                            },
                            {
                                type: 'email',
                                message: t('formValidateMessages.types.email')
                            }
                        ]}
                        name='email'
                    >
                        <ESInput
                            data-testid='es-signin-form__form__email'
                            size='large'
                            placeholder={t('global.user')}
                        />
                    </ESFormItem>
                    <ESFormItem
                        name='password'
                        rules={[
                            {
                                required: true,
                                whitespace: true,
                                message: t('formValidateMessages.required')
                            }
                        ]}
                    >
                        <ESInput
                            size='large'
                            placeholder={t('global.password')}
                            component={ESInput.Password}
                            data-testid='es-signin-form__form__password'
                        />
                    </ESFormItem>
                    <ESRow
                        type='flex'
                        justify='space-between'
                        align='middle'
                        className='mb-lg es-sign-in-form__form--extra'
                    >
                        <ESCol>
                            <ESCheckbox
                                checked={isKeepMeLoggedChecked}
                                onClick={() => keepMeLogged()}
                                data-testid='es-signin-form__form__keep-me-logged-in'
                            >
                                {keepMeLoggedIn}
                            </ESCheckbox>
                        </ESCol>
                        <ESCol>
                            <ESButton
                                href='/#/auth/recuperar-senha'
                                variant='text'
                                bold
                                color='primary'
                                data-testid='es-signin-form__form__forgot-password'
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
                        data-testid='es-signin-form__form__do-login'
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
