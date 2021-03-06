import React, { useState } from 'react'

import { useQuery } from '@apollo/react-hooks'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'

import {
    SANForm,
    SANFormItem,
    withSANForm,
    SANInput,
    SANInputPassword,
    SANSelect,
    SANSelectOption,
    SANBox,
    SANButton,
    SANRadioGroup,
    SANRadio,
    SANTextArea,
    SANSlider,
    useSnackbarContext,
    SANDivider,
    SANTypography,
    ISANFormComponentProps
} from '@sanar/components'
import { useWindowSize } from '@sanar/utils/dist/Hooks'

import { GET_CANCEL_REASONS } from 'Apollo/SignmentManagement/Query/cancel-reasons'
import signInByEmail from 'Pages/Auth/SignIn/signIn'
import { useAuthContext } from 'Hooks/auth'
import { graduatePeriod } from './staticData'

import rmLogo from 'Assets/images/brand/rm.svg'
import rmLogoVertical from 'Assets/images/brand/rm-vertical.svg'

interface IProps extends ISANFormComponentProps {
    onSubmit?: any
    destiny?: 'pause' | 'cancel'
    form: any
}

const RMLink = styled(SANBox)`
    color: #53d4b8;
    font-weight: bold;

    &:hover {
        color: #099e76;
    }
`

const RMCard = () => {
    const { width } = useWindowSize()
    const { t } = useTranslation('sanarflix')

    return (
        <SANBox
            mt='2'
            mb='6'
            border='1px solid'
            borderColor='#53D4B8'
            borderRadius={1}
            display={{ lg: 'flex' }}
        >
            <SANBox
                bg='#53D4B8'
                p={{ xs: '2', lg: '4' }}
                display='flex'
                justifyContent='center'
            >
                <SANBox
                    as='img'
                    src={width < 992 ? rmLogo : rmLogoVertical}
                    alt='rm-logo'
                />
            </SANBox>
            <SANBox
                px='4'
                py={{ _: 2, lg: 0 }}
                display='flex'
                alignItems='center'
                justifyContent='center'
            >
                <SANTypography>
                    <SANBox
                        as='span'
                        dangerouslySetInnerHTML={{
                            __html: t('sigmentManagement.selectCancelReasonRM')
                        }}
                    />
                    <RMLink
                        ml='2'
                        as='a'
                        href='https://www.sanarmed.com/residenciamedica/'
                        target='_blanck'
                    >
                        {t('global.knowMore')}
                    </RMLink>
                </SANTypography>
            </SANBox>
        </SANBox>
    )
}

const FLXCancelOrPauseForm: React.FC<IProps> = ({
    onSubmit: onSubmitProp,
    destiny = 'cancel',
    form
}) => {
    const { t } = useTranslation('sanarflix')
    const createSnackbar = useSnackbarContext()
    const { me } = useAuthContext()
    const [loading, setLoading] = useState(false)
    const [cancelCause, setCancelCause] = useState()

    const onChangeCancelCause = value => setCancelCause(value)

    const onSubmit = async e => {
        e.preventDefault()
        setLoading(true)
        try {
            await form.validateFields()

            const { password, ...rest } = form.getFieldsValue()
            await signInByEmail(me.email, password)
            onSubmitProp(rest)
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
            py={{ lg: 8, _: 'md' }}
            px={{ lg: 9, _: 'md' }}
            m={{ _: '0 -16px -60px -16px', lg: 0 }}
        >
            <SANDivider
                display={{ lg: 'none', _: 'block' }}
                bg='grey.2'
                mb='xl'
                mx='-16px'
            />
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
                            message: t('sanarui:formValidateMessages.required')
                        }
                    ]}
                >
                    <SANSelect
                        size='large'
                        label={t('sigmentManagement.selectCancelReasonLabel')}
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
                            <SANTextArea
                                size='large'
                                rows='3'
                                placeholder={t('sigmentManagement.writeReason')}
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
                            mb={cancelCause && 3}
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
                                onChange={onChangeCancelCause}
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
                        {cancelCause ? (
                            cancelCause === 'residencePreparation' ? (
                                <RMCard />
                            ) : (
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
                                        placeholder={t(
                                            'sigmentManagement.causeObservation'
                                        )}
                                    />
                                </SANFormItem>
                            )
                        ) : null}
                    </>
                ) : (
                    <span />
                )}
                <SANFormItem
                    name='rating'
                    label={t('sigmentManagement.recommend')}
                    initialValue={8}
                    rules={[
                        {
                            type: 'number',
                            required: true,
                            whitespace: true,
                            message: t('sanarui:formValidateMessages.required')
                        }
                    ]}
                >
                    <SANSlider initialValue={8} />
                </SANFormItem>
                <SANFormItem
                    name='ratingObservation'
                    label={t('sigmentManagement.writeReasonLabel')}
                    rules={[
                        {
                            required: true,
                            whitespace: true,
                            message: t('sanarui:formValidateMessages.required')
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
                            message: t('sanarui:formValidateMessages.required')
                        }
                    ]}
                >
                    <SANInputPassword
                        size='large'
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
                        bold
                        uppercase
                        loading={loading}
                        blockOnlyMobile
                    >
                        {destiny === 'cancel'
                            ? t('sigmentManagement.confirmCancel')
                            : t('sigmentManagement.confirmPause')}
                    </SANButton>
                </SANBox>
            </SANForm>
        </SANBox>
    )
}

export default withSANForm<IProps>(FLXCancelOrPauseForm)
