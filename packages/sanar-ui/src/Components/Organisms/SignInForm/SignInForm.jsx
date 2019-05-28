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
import ESForm, { ESFormItem, withESForm } from '../../Molecules/Form'
import { message } from 'antd'
import esSignIn from '../../../Util/Auth/signIn'

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
                message.error(error)
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
                </div>
            </ESForm>
        </div>
    )
}

ESSignInForm.propTypes = {
    className: PropTypes.string
}
ESSignInForm.defaultProps = {}

export default withESForm()(ESSignInForm)
