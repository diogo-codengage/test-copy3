import React, { useState } from 'react'

import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import { theme } from 'styled-tools'

import { SANSpin } from '../../Atoms/Spin'
import { SANTypography } from '../../Atoms/Typography'
import { SANBox } from '../../Atoms/Box'
import { SANInputPassword } from '../../Atoms/InputPassword'
import { SANButton } from '../../Atoms/Button'
import { SANForm, SANFormItem, withSANForm } from '../../Molecules/Form'

import { useThemeContext } from '@sanar/utils/dist/Hooks'

interface IFormValues {
    old: string
    new: string
    confirm: string
}

interface IOptions {
    setSubmitting: (submitting: boolean) => any
}

export interface ISANChangePasswordProps {
    onSubmit?: (values: IFormValues, options: IOptions) => IFormValues
    onForgot?: () => void
    form: any
}

const Image = styled.img`
    width: 392px;
    margin-bottom: ${theme('space.xxl')};

    ${theme('mediaQueries.down.md')} {
        width: 228px;
    }
`

const SANChangePassword = ({ form, onSubmit, onForgot }) => {
    const {
        assets: {
            icons: {
                auth: { changePassword }
            }
        }
    } = useThemeContext()
    const { t } = useTranslation('components')
    const [submitting, setSubmitting] = useState(false)
    const [confirmDirty, setConfirmDirty] = useState(false)

    const handleSubmit = e => {
        e.preventDefault()
        setSubmitting(true)
        form.validateFields((err, values) => {
            if (!err) {
                onSubmit(values, { setSubmitting })
            } else {
                setSubmitting(false)
            }
        })
    }

    const handleConfirmBlur = e => {
        const { value } = e.target
        setConfirmDirty(confirmDirty || !!value)
    }

    const compareToFirstPassword = (rule, value, callback) => {
        if (!!value && value !== form.getFieldValue('new')) {
            callback(t('customFormMessages.passwordsMismatch'))
        } else {
            callback()
        }
    }

    const validateToNextPassword = (_, value, callback) => {
        if (!!value && confirmDirty) {
            form.validateFields(['confirm'], { force: true })
        }
        callback()
    }

    const required = {
        required: true,
        message: t('formValidateMessages.required')
    }

    const min = {
        min: 6,
        message: t('customFormMessages.minPassword', {
            min: 6
        })
    }

    return (
        <SANBox display='flex' flexDirection='column' px='xl'>
            <SANBox
                display='flex'
                flexDirection='column'
                alignItems='center'
                my={9}
            >
                <Image src={changePassword} />
                <SANBox maxWidth={360} width='100%'>
                    <SANTypography
                        fontSize={{ xs: '6', _: 'xxl' }}
                        strong
                        textAlign='center'
                    >
                        {t('changePassword.title')}
                    </SANTypography>
                    <SANTypography
                        fontSize={{ xs: 'lg', _: 'md' }}
                        my='md'
                        textAlign='center'
                    >
                        {t('changePassword.subtitle')}
                    </SANTypography>
                </SANBox>

                <SANBox maxWidth={360} width='100%'>
                    <SANSpin spinning={submitting} flex>
                        <SANForm form={form} onSubmit={handleSubmit}>
                            <SANFormItem
                                mb='md'
                                name='old'
                                rules={[required, min]}
                            >
                                <SANInputPassword
                                    size='large'
                                    placeholder={t(
                                        'changePassword.fields.current'
                                    )}
                                />
                            </SANFormItem>{' '}
                            <SANFormItem
                                mb='md'
                                name='new'
                                rules={[
                                    required,
                                    min,
                                    { validator: validateToNextPassword }
                                ]}
                            >
                                <SANInputPassword
                                    size='large'
                                    placeholder={t('changePassword.fields.new')}
                                />
                            </SANFormItem>
                            <SANFormItem
                                mb='md'
                                name='confirm'
                                rules={[
                                    required,
                                    {
                                        validator: compareToFirstPassword
                                    }
                                ]}
                            >
                                <SANInputPassword
                                    onBlur={handleConfirmBlur}
                                    size='large'
                                    placeholder={t(
                                        'changePassword.fields.confirm'
                                    )}
                                />
                            </SANFormItem>
                            <SANButton
                                htmlType='submit'
                                uppercase
                                block
                                bold
                                variant='solid'
                                color='primary'
                                mb='md'
                            >
                                {t('changePassword.confirm')}
                            </SANButton>
                            <SANButton
                                uppercase
                                block
                                bold
                                variant='text'
                                color='primary'
                                onClick={onForgot}
                            >
                                {t('changePassword.forgot')}
                            </SANButton>
                        </SANForm>
                    </SANSpin>
                </SANBox>
            </SANBox>
        </SANBox>
    )
}

export default withSANForm<ISANChangePasswordProps>(SANChangePassword)
