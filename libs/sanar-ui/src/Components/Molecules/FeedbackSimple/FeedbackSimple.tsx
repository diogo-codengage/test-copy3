import React from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'

import { useTranslation } from 'react-i18next'

import ESModal, { ESModalFooter } from '../../Atoms/Modal'
import { ESTextArea } from '../../Atoms/Input'
import ESCheckbox from '../../Atoms/Checkbox'
import ESButton from '../../Atoms/Button'
import ESTypography from '../../Atoms/Typography'
import ESForm, { withESForm, ESFormItem } from '../Form'

const ESFeedbackSimple =
    ({ visible, onOk, onCancel, form, onSubmit, className }) => {
        const { t } = useTranslation('sanarui')
        const classes = classNames('es-feedback-simple', className)

        const handleSubmit = e => {
            e.preventDefault()
            form.validateFieldsAndScroll((err, values) => {
                if (!err) {
                    onSubmit && onSubmit(values)
                }
            })
        }

        return (
            <ESModal
                centered
                className={classes}
                visible={visible}
                onOk={onOk}
                onCancel={onCancel}
                title={t('feedbackSimple.giveFeedback')}
            >
                <ESForm form={form} onSubmit={handleSubmit}>
                    <ESFormItem
                        name='message'
                        label={t('feedbackSimple.title')}
                        rules={[
                            {
                                required: true,
                                message: t('formValidateMessages.required')
                            }
                        ]}
                    >
                        <ESTextArea
                            rows={5}
                            placeholder={t('feedbackSimple.placeholder')}
                            className='mt-xs'
                        />
                    </ESFormItem>
                    <ESFormItem name='allowContact'>
                        <ESCheckbox>
                            <ESTypography component='span' variant='caption'>
                                {t('feedbackSimple.checkbox')}
                            </ESTypography>
                        </ESCheckbox>
                    </ESFormItem>
                    <ESModalFooter>
                        <ESFormItem>
                            <ESButton
                                size='small'
                                variant='solid'
                                color='primary'
                                uppercase
                                bold
                                htmlType='submit'
                            >
                                {t('feedbackSimple.send')}
                            </ESButton>
                        </ESFormItem>
                    </ESModalFooter>
                </ESForm>
            </ESModal>
        )
    }


ESFeedbackSimple.propTypes = {
    className: PropTypes.string
}
ESFeedbackSimple.defaultProps = {}

export default withESForm(ESFeedbackSimple)
