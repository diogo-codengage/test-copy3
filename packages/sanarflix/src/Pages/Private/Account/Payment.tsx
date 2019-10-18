import React, { useState, useEffect } from 'react'

import { compose } from 'ramda'
import { withRouter } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import { theme } from 'styled-tools'
import { useApolloClient } from '@apollo/react-hooks'

import {
    SANTypography,
    SANPage,
    SANSessionTitle,
    SANRow,
    SANCol,
    SANBox,
    SANForm,
    SANFormItem,
    withSANForm,
    SANInput,
    SANInputMask,
    SANSelect,
    SANSelectOption,
    SANDivider,
    SANButton,
    SANEvaIcon,
    SANTooltip,
    SANSpin,
    useSnackbarContext
} from '@sanar/components'

import i18n from 'sanar-ui/dist/Config/i18n'

import { useAuthContext } from 'Hooks/auth'
import { EDIT_CREDIT_CARD_MUTATION } from 'Apollo/User/Mutations/edit-credit-card'

import { events } from 'Config/Segment'

const years = new Array(31).fill(1).map((_, i) => i + 2000)
const months = new Array(12).fill(1).map((_, i) => i)

const renderYear = (year, index) => (
    <SANSelectOption key={`${index}-${year}`} value={year}>
        {year}
    </SANSelectOption>
)

const renderMonth = index => (
    <SANSelectOption key={index} value={index + 1}>
        {i18n.t(`sanarflix:global.months.${index}`)}
    </SANSelectOption>
)

const SANEvaIconStyled = styled(SANEvaIcon)`
    && {
        color: ${theme('colors.grey.3')};
    }
`

const SANFormItemMonth = styled(SANFormItem)`
    && {
        width: 50%;
        float: left;
    }
`

const SANFormItemYear = styled(SANFormItem)`
    && {
        width: calc(50% - 8px);
        float: right;
        margin-top: 24px;

        ${theme('mediaQueries.down.sm')} {
            margin-top: 32px;
        }
    }
`

const required = {
    required: true,
    message: i18n.t('components:formValidateMessages.required')
}

const LabelCvv = () => {
    const { t } = useTranslation('sanarflix')

    return (
        <SANBox display='inline-flex' alignItems='center'>
            {t('paymentMethods.creditCard.cvv.title')}
            <SANEvaIconStyled
                name='question-mark-circle-outline'
                ml='xs'
                data-tip
                data-for='cvv'
            />
        </SANBox>
    )
}

const FLXPayment = ({ history, form }) => {
    const { t } = useTranslation('sanarflix')
    const { me } = useAuthContext()
    const snackbar = useSnackbarContext()
    const [submitting, setSubmitting] = useState(false)
    const [focus, setFocus] = useState(false)
    const client = useApolloClient()

    const onFocus = () => !focus && setFocus(true)

    const handleSubmit = e => {
        e.preventDefault()
        form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                handleSave(values)
            }
        })
    }

    const replaceAll = char => new RegExp(char, 'ig')

    const handleSave = async values => {
        setSubmitting(true)
        try {
            const underline = replaceAll('_')
            const asterisk = replaceAll('\\*')
            const card_cvv = values.card_cvv.replace(underline, '')
            const card_number = values.card_number
                .replace(asterisk, '')
                .replace(underline, '')
            await client.mutate({
                mutation: EDIT_CREDIT_CARD_MUTATION,
                variables: {
                    ...values,
                    card_number: card_number,
                    card_cvv: Number(card_cvv)
                }
            })
            snackbar({
                message: t('account.creditCard.success'),
                theme: 'success'
            })
        } catch {
            snackbar({
                message: t('account.creditCard.error'),
                theme: 'error'
            })
        }
        setSubmitting(false)
    }

    useEffect(() => {
        window.analytics.page(
            events['Page Viewed'].event,
            events['Page Viewed'].data
        )
    }, [])

    return (
        <>
            <SANTooltip border multiline type='light' id='cvv' width={260}>
                {t('paymentMethods.creditCard.cvv.tooltip')}
            </SANTooltip>
            <SANPage
                hasContainer
                BoxProps={{
                    bg: 'grey-solid.1',
                    flex: '1',
                    py: { xs: '8', _: 'md' }
                }}
                HeaderProps={{
                    onBack: () => history.goBack(),
                    SessionTitleProps: {
                        title: t('paymentMethods.title'),
                        subtitle: t('paymentMethods.subtitle')
                    }
                }}
            >
                <SANRow>
                    <SANCol sm={0} md={24}>
                        <SANSessionTitle
                            title={t('paymentMethods.creditCard.title')}
                        />
                    </SANCol>
                    <SANCol xs={24}>
                        <SANSpin spinning={submitting}>
                            <SANBox
                                alignItems='center'
                                bg='white.10'
                                borderRadius='base'
                                border='1px solid'
                                borderColor='grey.2'
                                boxShadow='1'
                            >
                                <SANBox p={{ xs: 'xl', _: 'sm' }}>
                                    <SANTypography level={6} color='grey.7'>
                                        {t(
                                            'paymentMethods.creditCard.subtitle'
                                        )}
                                    </SANTypography>
                                </SANBox>
                                <SANDivider bg='grey.1' m='0' />
                                <SANBox p={{ xs: 'xl', _: 'sm' }}>
                                    <SANForm
                                        form={form}
                                        onSubmit={handleSubmit}
                                    >
                                        <SANRow gutter={24}>
                                            <SANCol xs={16} sm={9} lg={13}>
                                                <SANFormItem
                                                    name='card_number'
                                                    label={t(
                                                        'paymentMethods.creditCard.number'
                                                    )}
                                                    initialValue={
                                                        !!me
                                                            ? me.card
                                                                  .card_number
                                                            : undefined
                                                    }
                                                    rules={[required]}
                                                >
                                                    <SANInputMask
                                                        customRequired
                                                        onFocus={onFocus}
                                                        mask={
                                                            focus
                                                                ? 'CREDIT_CARD'
                                                                : 'CREDIT_CARD_PREVIEW'
                                                        }
                                                        InputProps={{
                                                            placeholder: t(
                                                                'paymentMethods.creditCard.number'
                                                            ),
                                                            size: 'large'
                                                        }}
                                                    />
                                                </SANFormItem>
                                            </SANCol>
                                            <SANCol xs={8} sm={5} lg={4}>
                                                <SANFormItem
                                                    name='card_cvv'
                                                    label={<LabelCvv />}
                                                    rules={[required]}
                                                >
                                                    <SANInputMask
                                                        customRequired
                                                        mask='CVV'
                                                        InputProps={{
                                                            placeholder: t(
                                                                'paymentMethods.creditCard.cvv.title'
                                                            ),
                                                            size: 'large'
                                                        }}
                                                    />
                                                </SANFormItem>
                                            </SANCol>
                                            <SANCol xs={24} sm={10} lg={7}>
                                                <SANFormItemMonth
                                                    label={t(
                                                        'paymentMethods.creditCard.expiration'
                                                    )}
                                                    name='card_expiration_month'
                                                    rules={[required]}
                                                >
                                                    <SANSelect
                                                        customRequired
                                                        placeholder={t(
                                                            'paymentMethods.creditCard.month'
                                                        )}
                                                        size='large'
                                                    >
                                                        {months.map(
                                                            renderMonth
                                                        )}
                                                    </SANSelect>
                                                </SANFormItemMonth>
                                                <SANFormItemYear
                                                    name='card_expiration_year'
                                                    rules={[required]}
                                                >
                                                    <SANSelect
                                                        customRequired
                                                        placeholder={t(
                                                            'paymentMethods.creditCard.year'
                                                        )}
                                                        size='large'
                                                    >
                                                        {years.map(renderYear)}
                                                    </SANSelect>
                                                </SANFormItemYear>
                                            </SANCol>
                                            <SANCol xs={24}>
                                                <SANFormItem
                                                    name='holder_name'
                                                    label={t(
                                                        'paymentMethods.creditCard.name'
                                                    )}
                                                    rules={[required]}
                                                >
                                                    <SANInput
                                                        customRequired
                                                        placeholder={t(
                                                            'paymentMethods.creditCard.name'
                                                        )}
                                                        size='large'
                                                    />
                                                </SANFormItem>
                                            </SANCol>
                                            <SANCol xs={24}>
                                                <SANFormItem m='0'>
                                                    <SANBox
                                                        display='flex'
                                                        justifyContent='flex-end'
                                                    >
                                                        <SANButton
                                                            variant='solid'
                                                            color='primary'
                                                            uppercase
                                                            bold
                                                            htmlType='submit'
                                                            blockOnlyMobile
                                                        >
                                                            {t(
                                                                'paymentMethods.creditCard.confirm'
                                                            )}
                                                        </SANButton>
                                                    </SANBox>
                                                </SANFormItem>
                                            </SANCol>
                                        </SANRow>
                                    </SANForm>
                                </SANBox>
                            </SANBox>
                        </SANSpin>
                    </SANCol>
                </SANRow>
            </SANPage>
        </>
    )
}

const enhance = compose(
    withRouter,
    withSANForm
)

export default enhance(FLXPayment)
