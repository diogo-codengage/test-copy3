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
    form
}) => {
    const { t } = useTranslation('sanarui')
    const classes = classNames('es-sign-in-form', className)
    const [loading, setLoading] = useState(false)

    const signIn = e => {
        e.preventDefault()
        setLoading(true)
        form.validateFields().then(() => {
            const { email, password } = form.getFieldsValue()
            signInByEmail(email, password)
                .then(response => {
                    setLoading(false)
                    actProp()
                })
                .catch(error => {
                    setLoading(false)
                    message.error(error.message)
                })
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

    const validator = () =>
        !!(!form.isFieldTouched('email') || !form.isFieldTouched('password'))

    return (
        <div className={classes}>
            <Spin indicator={antIcon} spinning={loading}>
                <ESForm
                    form={form}
                    onSubmit={signIn}
                    customValidator={() => validator()}
                >
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
                        <ESInput size='large' placeholder={t('global.user')} />
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
