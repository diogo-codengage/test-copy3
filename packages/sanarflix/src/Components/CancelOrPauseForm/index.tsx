import React, { useState } from 'react'

import {
    SANForm,
    SANFormItem,
    withSANForm,
    SANInput,
    SANSelect,
    SANSelectOption,
    SANBox,
    SANButton,
    SANRadioGroup,
    SANRadio,
    SANTextArea,
    SANSlider,
    useSnackbarContext
} from '@sanar/components'
import { useTranslation } from 'react-i18next'
import signInByEmail from 'Pages/Auth/SignIn/signIn'
import { useAuthContext } from 'Hooks/auth'
import { useQuery } from '@apollo/react-hooks'
import { GET_CANCEL_REASONS } from 'Apollo/SignmentManagement/Query/cancel-reasons'
import { graduatePeriod } from './staticData'

interface IProps {
    onSubmit?: any
    destiny?: 'pause' | 'cancel'
}

export const FLXCancelOrPauseForm: React.FC<IProps> = withSANForm(
    ({ onSubmit: onSubmitProp, destiny = 'cancel', form }) => {
        const { t } = useTranslation('sanarflix')
        const createSnackbar = useSnackbarContext()
        const { me } = useAuthContext()
        const [loading, setLoading] = useState(false)

        const onSubmit: (e: any) => Object = async e => {
            e.preventDefault()
            setLoading(true)
            try {
                await form.validateFields()

                const { password } = form.getFieldsValue()
                await signInByEmail(me.email, password)
                onSubmitProp(await form.getFieldsValue())
            } catch (e) {
                if (!!e.message) {
                    createSnackbar({
                        message: e.message,
                        theme: 'error'
                    })
                }
            }

            setLoading(false)
        }

        const {
            data: { cancelSubsctiptionsCauses: reasons }
        }: any = useQuery(GET_CANCEL_REASONS)

        return (
            <SANBox
                border={{ lg: '0.5pt solid' }}
                borderColor={{ lg: 'grey.2' }}
                borderRadius={{ lg: 1 }}
                backgroundColor='white.10'
                py={6}
                px={4}
                m={{ xs: '0 -16px -60px -16px', lg: 0 }}
            >
                <SANForm form={form} onSubmit={onSubmit}>
                    {destiny === 'pause' ? (
                        <>
                            <SANFormItem
                                name='email'
                                label='Email'
                                rules={[
                                    {
                                        required: true,
                                        whitespace: true,
                                        message: t(
                                            'sanarui:formValidateMessages.required'
                                        )
                                    },
                                    {
                                        type: 'email',
                                        message: t(
                                            'sanarui:formValidateMessages.types.email'
                                        )
                                    }
                                ]}
                            >
                                <SANInput
                                    size='large'
                                    placeholder={t('sigmentManagement.email')}
                                />
                            </SANFormItem>
                            <SANFormItem
                                name='name'
                                label={t('sigmentManagement.nameLabel')}
                                rules={[
                                    {
                                        required: true,
                                        whitespace: true,
                                        message: t(
                                            'sanarui:formValidateMessages.required'
                                        )
                                    }
                                ]}
                            >
                                <SANInput
                                    size='large'
                                    placeholder={t('sigmentManagement.name')}
                                />
                            </SANFormItem>
                        </>
                    ) : (
                        <span />
                    )}
                    <SANFormItem
                        name='graduationPeriod'
                        label={t('sigmentManagement.selectPeriodLabel')}
                        rules={[
                            {
                                required: true,
                                whitespace: true,
                                message: t(
                                    'sanarui:formValidateMessages.required'
                                )
                            }
                        ]}
                    >
                        <SANSelect
                            size='large'
                            label={t(
                                'sigmentManagement.selectCancelReasonLabel'
                            )}
                            placeholder={t('sigmentManagement.selectPeriod')}
                        >
                            {graduatePeriod.map(item => (
                                <SANSelectOption key={item.value}>
                                    {item.name}
                                </SANSelectOption>
                            ))}
                        </SANSelect>
                    </SANFormItem>
                    {destiny === 'pause' ? (
                        <>
                            <SANFormItem
                                name='pauseMonths'
                                label={t('sigmentManagement.howMuchTimeLabel')}
                                rules={[
                                    {
                                        type: 'number',
                                        required: true,
                                        whitespace: true,
                                        message: t(
                                            'sanarui:formValidateMessages.required'
                                        )
                                    }
                                ]}
                            >
                                <SANRadioGroup>
                                    <SANRadio value={1}>
                                        {t(
                                            'sigmentManagement.howMuchTime.keyWithCount',
                                            {
                                                count: 1
                                            }
                                        )}
                                    </SANRadio>
                                    <SANRadio value={2}>
                                        {t(
                                            'sigmentManagement.howMuchTime.keyWithCount',
                                            {
                                                count: 2
                                            }
                                        )}
                                    </SANRadio>
                                    <SANRadio value={3}>
                                        {t(
                                            'sigmentManagement.howMuchTime.keyWithCount',
                                            {
                                                count: 3
                                            }
                                        )}
                                    </SANRadio>
                                </SANRadioGroup>
                            </SANFormItem>
                            <SANFormItem
                                name='cause'
                                label={t(
                                    'sigmentManagement.writeReasonToPauseLabel'
                                )}
                                rules={[
                                    {
                                        required: true,
                                        whitespace: true,
                                        message: t(
                                            'sanarui:formValidateMessages.required'
                                        )
                                    }
                                ]}
                            >
                                <SANInput
                                    size='large'
                                    placeholder={t(
                                        'sigmentManagement.writeReason'
                                    )}
                                />
                            </SANFormItem>
                        </>
                    ) : (
                        <span />
                    )}

                    {destiny === 'cancel' ? (
                        <>
                            <SANFormItem
                                name='cause'
                                mb={3}
                                label={t(
                                    'sigmentManagement.selectCancelReasonLabel'
                                )}
                                rules={[
                                    {
                                        required: true,
                                        whitespace: true,
                                        message: t(
                                            'sanarui:formValidateMessages.required'
                                        )
                                    }
                                ]}
                            >
                                <SANSelect
                                    size='large'
                                    placeholder={t(
                                        'sigmentManagement.selectCancelReason'
                                    )}
                                >
                                    {reasons &&
                                        reasons.map((item, index) => (
                                            <SANSelectOption
                                                key={index}
                                                value={item.cause}
                                            >
                                                {item.description}
                                            </SANSelectOption>
                                        ))}
                                </SANSelect>
                            </SANFormItem>
                            <SANFormItem
                                name='causeObservation'
                                rules={[
                                    {
                                        required: true,
                                        whitespace: true,
                                        message: t(
                                            'sanarui:formValidateMessages.required'
                                        )
                                    }
                                ]}
                            >
                                <SANTextArea
                                    size='large'
                                    rows='3'
                                    placeholder={t('sigmentManagement.name')}
                                />
                            </SANFormItem>
                        </>
                    ) : (
                        <span />
                    )}
                    <SANFormItem
                        name='rating'
                        label={t('sigmentManagement.writeReasonLabel')}
                        rules={[
                            {
                                type: 'number',
                                required: true,
                                whitespace: true,
                                message: t(
                                    'sanarui:formValidateMessages.required'
                                )
                            }
                        ]}
                    >
                        <SANSlider
                            onChange={console.log}
                            placeholder={t('sigmentManagement.writeReason')}
                        />
                    </SANFormItem>
                    <SANFormItem
                        name='ratingObservation'
                        label={t('sigmentManagement.writeReasonLabel')}
                        rules={[
                            {
                                required: true,
                                whitespace: true,
                                message: t(
                                    'sanarui:formValidateMessages.required'
                                )
                            }
                        ]}
                    >
                        <SANInput
                            size='large'
                            placeholder={t('sigmentManagement.writeReason')}
                        />
                    </SANFormItem>
                    <SANFormItem
                        name='password'
                        label={t('sigmentManagement.typePasswordLabel')}
                        rules={[
                            {
                                required: true,
                                whitespace: true,
                                message: t(
                                    'sanarui:formValidateMessages.required'
                                )
                            }
                        ]}
                    >
                        <SANInput
                            size='large'
                            type='password'
                            placeholder={t('sigmentManagement.typePassword')}
                        />
                    </SANFormItem>
                    <SANBox
                        display='flex'
                        alignItems='center'
                        justifyContent='center'
                        pt={4}
                        mb={5}
                    >
                        <SANButton
                            htmlType='submit'
                            color='primary'
                            variant='solid'
                            uppercase
                            loading={loading}
                        >
                            confirmar cancelamento
                        </SANButton>
                    </SANBox>
                </SANForm>
            </SANBox>
        )
    }
)
