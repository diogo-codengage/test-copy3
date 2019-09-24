import React from 'react'

import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import { theme } from 'styled-tools'

import { SANBrandHeader } from '../../Atoms/BrandHeader'
import { SANTypography } from '../../Atoms/Typography'
import { SANBox } from '../../Atoms/Box'
import { SANInput } from '../../Atoms/Input'
import { SANButton } from '../../Atoms/Button'
import { SANForm, SANFormItem, withSANForm } from '../../Molecules/Form'

import { useThemeContext } from '@sanar/utils/dist/Hooks'

const Image = styled.img`
    width: 392px;
    margin-bottom: ${theme('space.xxl')};

    ${theme('mediaQueries.down.md')} {
        width: 228px;
    }
`

const SANPasswordRecoveryTemplate = ({ form }) => {
    const {
        assets: {
            icons: {
                auth: { changePassword }
            }
        }
    } = useThemeContext()
    const { t } = useTranslation('components')

    const compareToFirstPassword = (rule, value, callback) => {
        if (value && value !== form.getFieldValue('password')) {
            callback('')
        } else {
            callback()
        }
    }

    const validateToNextPassword = (rule, value, callback) => {
        const { passwordConfirm } = form.getFieldsValue()
        if (value && passwordConfirm) {
            form.validateFields(['passwordConfirm'], { force: true })
        }
        callback()
    }

    return (
        <SANBox display='flex' flexDirection='column' bg='white.10'>
            <SANBrandHeader />
            <SANBox
                display='flex'
                flexDirection='column'
                alignItems='center'
                my={9}
            >
                <Image src={changePassword} />
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

                <SANForm form={form}>
                    <SANFormItem
                        name='password'
                        rules={[
                            {
                                required: true,
                                message: t(
                                    'sanarui:formValidateMessages.required'
                                )
                            },
                            {
                                min: 6,
                                message: t('auth.validations.minPassword', {
                                    min: 6
                                })
                            },
                            {
                                validator: validateToNextPassword
                            }
                        ]}
                    >
                        <SANInput
                            size='large'
                            placeholder={t('changePassword.current')}
                        />
                    </SANFormItem>{' '}
                    <SANFormItem
                        name='new'
                        rules={[
                            {
                                required: true,
                                message: t(
                                    'sanarui:formValidateMessages.required'
                                )
                            },
                            {
                                min: 6,
                                message: t('auth.validations.minPassword', {
                                    min: 6
                                })
                            },
                            {
                                validator: validateToNextPassword
                            }
                        ]}
                    >
                        <SANInput
                            size='large'
                            placeholder={t('changePassword.new')}
                        />
                    </SANFormItem>
                    <SANFormItem
                        name='passwordConfirm'
                        rules={[
                            {
                                required: true,
                                message: t(
                                    'sanarui:formValidateMessages.required'
                                )
                            },
                            {
                                validator: compareToFirstPassword,
                                message: t('auth.validations.passwordsMismatch')
                            }
                        ]}
                    >
                        <SANInput
                            size='large'
                            placeholder={t('changePassword.confirmPassword')}
                        />
                    </SANFormItem>
                    <SANButton
                        htmlType='submit'
                        uppercase
                        block
                        variant='solid'
                        color='primary'
                        className='mb-md'
                    >
                        {t('changePassword.confirm')}
                    </SANButton>
                    <SANButton uppercase block variant='text' color='primary'>
                        {t('changePassword.forgot')}
                    </SANButton>
                </SANForm>
            </SANBox>
        </SANBox>
    )
}

export default withSANForm(SANPasswordRecoveryTemplate)
