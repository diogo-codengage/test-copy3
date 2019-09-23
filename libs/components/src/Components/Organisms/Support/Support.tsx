import React from 'react'

import { useTranslation } from 'react-i18next'

import { SANInput } from '../../Atoms/Input'
import { SANTextArea } from '../../Atoms/TextArea'
import { SANCheckbox } from '../../Atoms/Checkbox'
import { SANButton } from '../../Atoms/Button'
import { SANModal, SANModalFooter, ISANModalProps } from '../../Molecules/Modal'
import { SANForm, SANFormItem, withSANForm } from '../../Molecules/Form'

interface IForm {
    email?: string
    message?: string
    check?: boolean
}

export interface ISANSupportProps {
    ModalProps: ISANModalProps
    onSubmit?: () => void
    form: any
    data?: IForm
}

const SANSupport = ({ form, onSubmit, data = {} as IForm, ModalProps }) => {
    const { t } = useTranslation('components')

    const handleSubmit = e => {
        e.preventDefault()
        form.validateFields((err, values) => {
            if (!err) {
                onSubmit(values)
            }
        })
    }

    return (
        <SANModal
            centered
            title={t('support.title')}
            closable={false}
            {...ModalProps}
        >
            <SANForm form={form} onSubmit={handleSubmit}>
                <SANFormItem
                    name='email'
                    label={t('support.email')}
                    initialValue={data.email || undefined}
                >
                    <SANInput
                        placeholder={t('support.email')}
                        size='large'
                        iconLeft='email-outline'
                    />
                </SANFormItem>
                <SANFormItem
                    name='message'
                    label={t('support.message.title')}
                    initialValue={data.message || undefined}
                >
                    <SANTextArea
                        placeholder={t('support.message.placeholder')}
                        size='large'
                        rows={4}
                    />
                </SANFormItem>
                <SANFormItem
                    name='check'
                    initialValue={data.check || undefined}
                    mb='xl'
                >
                    <SANCheckbox>{t('support.check')}</SANCheckbox>
                </SANFormItem>
                <SANModalFooter>
                    <SANButton
                        size='small'
                        mr='md'
                        variant='text'
                        uppercase
                        bold
                        onClick={ModalProps.onCancel}
                    >
                        {t('support.cancel')}
                    </SANButton>
                    <SANFormItem m='0'>
                        <SANButton
                            size='small'
                            variant='solid'
                            color='primary'
                            uppercase
                            bold
                            htmlType='submit'
                        >
                            {t('support.send')}
                        </SANButton>
                    </SANFormItem>
                </SANModalFooter>
            </SANForm>
        </SANModal>
    )
}

export default withSANForm<ISANSupportProps>(SANSupport)
