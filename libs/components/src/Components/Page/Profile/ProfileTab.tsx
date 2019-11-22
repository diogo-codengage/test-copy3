import React, { useState } from 'react'

import { useTranslation } from 'react-i18next'

import { useWindowSize } from '@sanar/utils/dist/Hooks'

import { SANSpin } from '../../Atoms/Spin'
import { SANBox } from '../../Atoms/Box'
import { SANDivider } from '../../Atoms/Divider'
import { SANTypography } from '../../Atoms/Typography'
import { SANSelect, SANSelectOption } from '../../Atoms/Select'
import { SANInput } from '../../Atoms/Input'
import { SANInputMask } from '../../Atoms/InputMask'
import { SANButton } from '../../Atoms/Button'
import { SANRow, SANCol } from '../../Molecules/Grid'
import { SANTabs, SANTabPane } from '../../Molecules/Tabs'
import { SANForm, SANFormItem, withSANForm } from '../../Molecules/Form'

import { IUser, IState } from './Profile'

export interface ProfileTabProps {
    states: IState[]
    user?: IUser
    onSubmit?: (user: IUser) => void
    form: any
}

const semesters = new Array(12).fill(1).map((_, i) => i + 1)

const renderSemester = (item, index) => (
    <SANSelectOption key={index} value={item}>
        {item}
    </SANSelectOption>
)

const renderState = state => (
    <SANSelectOption key={state.id} value={state.id}>
        {state.name}
    </SANSelectOption>
)

const ProfileTab = ({ user = {} as IUser, onSubmit, states, form }) => {
    const { width } = useWindowSize()
    const { t } = useTranslation('components')
    const [submitting, setSubmitting] = useState(false)

    const handleSubmit = e => {
        e.preventDefault()
        setSubmitting(true)
        form.validateFields((err, values) => {
            if (!err) {
                onSubmit(
                    {
                        ...values,
                        period: values.period ? values.period.toString() : null
                    },
                    { setSubmitting }
                )
            } else {
                setSubmitting(false)
            }
        })
    }

    return (
        <SANBox
            bg='white.10'
            borderRadius='base'
            border='1px solid'
            borderColor='grey.2'
            boxShadow='1'
        >
            <SANSpin spinning={submitting} flex>
                <SANTabs defaultActiveKey='1' center={width > 400}>
                    <SANTabPane
                        tab={
                            <SANTypography
                                fontSize='lg'
                                strong
                                data-testid='flix_my_account-profile--tab-personal'
                            >
                                {t('profile.tab1.title')}
                            </SANTypography>
                        }
                        key={1}
                        forceRender
                    >
                        <SANBox p='xl'>
                            <SANForm form={form} onSubmit={handleSubmit}>
                                <SANBox px={{ sm: '9', _: 0 }}>
                                    <SANFormItem
                                        name='name'
                                        label={t('profile.tab1.name')}
                                        initialValue={user.name || undefined}
                                        rules={[
                                            {
                                                required: true,
                                                message: t(
                                                    'formValidateMessages.required'
                                                )
                                            }
                                        ]}
                                    >
                                        <SANInput
                                            data-testid='flix_profile_tab-personal--input-name'
                                            required
                                            placeholder={t('profile.tab1.name')}
                                            size='large'
                                        />
                                    </SANFormItem>
                                    <SANFormItem
                                        name='cpf'
                                        label={t('profile.tab1.document')}
                                        initialValue={user.cpf || undefined}
                                    >
                                        <SANInputMask
                                            data-testid='flix_profile_tab-personal--input-cpf'
                                            mask='CPF_PREVIEW'
                                            disabled
                                            InputProps={{
                                                placeholder: t(
                                                    'profile.tab1.document'
                                                ),
                                                size: 'large',
                                                iconRight: 'slash-outline'
                                            }}
                                        />
                                    </SANFormItem>
                                    <SANFormItem
                                        name='phone_number'
                                        label={t('profile.tab1.phone')}
                                        initialValue={
                                            user.phone_number || undefined
                                        }
                                    >
                                        <SANInputMask
                                            data-testid='flix_profile_tab-personal--input-cellphone'
                                            mask='PHONE'
                                            InputProps={{
                                                placeholder: t(
                                                    'profile.tab1.phone'
                                                ),
                                                size: 'large'
                                            }}
                                        />
                                    </SANFormItem>
                                    <SANRow gutter={24}>
                                        {/*<SANCol xs={15}>*/}
                                        {/*    <SANFormItem*/}
                                        {/*        name='college'*/}
                                        {/*        label={t(*/}
                                        {/*            'profile.tab1.college'*/}
                                        {/*        )}*/}
                                        {/*        mb='md'*/}
                                        {/*        initialValue={*/}
                                        {/*            user.college || undefined*/}
                                        {/*        }*/}
                                        {/*    >*/}
                                        {/*        <SANInput*/}
                                        {/*            data-testid='flix_profile_tab-personal--input-university'*/}
                                        {/*            placeholder={t(*/}
                                        {/*                'profile.tab1.college'*/}
                                        {/*            )}*/}
                                        {/*            size='large'*/}
                                        {/*        />*/}
                                        {/*    </SANFormItem>*/}
                                        {/*</SANCol>*/}
                                        {/*<SANCol xs={9}>*/}
                                        {/*    <SANFormItem*/}
                                        {/*        name='period'*/}
                                        {/*        label={t(*/}
                                        {/*            'profile.tab1.semester.label'*/}
                                        {/*        )}*/}
                                        {/*        mb='md'*/}
                                        {/*        initialValue={*/}
                                        {/*            user.period || undefined*/}
                                        {/*        }*/}
                                        {/*    >*/}
                                        {/*        <SANSelect*/}
                                        {/*            data-testid='flix_profile_tab-personal--select-period'*/}
                                        {/*            placeholder={t(*/}
                                        {/*                'profile.tab1.semester.placeholder'*/}
                                        {/*            )}*/}
                                        {/*            size='large'*/}
                                        {/*        >*/}
                                        {/*            {semesters.map(*/}
                                        {/*                renderSemester*/}
                                        {/*            )}*/}
                                        {/*        </SANSelect>*/}
                                        {/*    </SANFormItem>*/}
                                        {/*</SANCol>*/}
                                    </SANRow>
                                </SANBox>
                                <SANDivider mb='xl' bg='grey.1' />
                                <SANFormItem m={0}>
                                    <SANBox
                                        display='flex'
                                        justifyContent='center'
                                    >
                                        <SANButton
                                            variant='solid'
                                            color='primary'
                                            uppercase
                                            bold
                                            htmlType='submit'
                                        >
                                            {t('profile.save')}
                                        </SANButton>
                                    </SANBox>
                                </SANFormItem>
                            </SANForm>
                        </SANBox>
                    </SANTabPane>
                    <SANTabPane
                        tab={
                            <SANTypography
                                fontSize='lg'
                                strong
                                data-testid='flix_my_account-profile--tab-address'
                            >
                                {t('profile.tab2.title')}
                            </SANTypography>
                        }
                        key={2}
                        forceRender
                    >
                        <SANBox p='xl'>
                            <SANForm form={form} onSubmit={handleSubmit}>
                                <SANBox px={{ sm: '9', _: 0 }}>
                                    <SANFormItem
                                        name='address.postal_code'
                                        label={t('profile.tab2.postalCode')}
                                        initialValue={
                                            !!user.address
                                                ? user.address.postal_code
                                                : undefined
                                        }
                                    >
                                        <SANInputMask
                                            data-testid='flix_profile_tab-personal--input-cep'
                                            mask='POSTAL_CODE'
                                            InputProps={{
                                                placeholder: t(
                                                    'profile.tab2.postalCode'
                                                ),
                                                size: 'large'
                                            }}
                                        />
                                    </SANFormItem>
                                    <SANFormItem
                                        name='address.address'
                                        label={t('profile.tab2.address')}
                                        initialValue={
                                            !!user.address
                                                ? user.address.address
                                                : undefined
                                        }
                                    >
                                        <SANInput
                                            data-testid='flix_profile_tab-personal--input-address'
                                            placeholder={t(
                                                'profile.tab2.address'
                                            )}
                                            size='large'
                                        />
                                    </SANFormItem>
                                    <SANFormItem
                                        name='address.district'
                                        label={t('profile.tab2.neighborhood')}
                                        initialValue={
                                            !!user.address
                                                ? user.address.district
                                                : undefined
                                        }
                                    >
                                        <SANInput
                                            data-testid='flix_profile_tab-personal--input-neighborhood'
                                            placeholder={t(
                                                'profile.tab2.neighborhood'
                                            )}
                                            size='large'
                                        />
                                    </SANFormItem>
                                    <SANFormItem
                                        name='address.complement'
                                        label={t(
                                            'profile.tab2.complement.label'
                                        )}
                                        initialValue={
                                            !!user.address
                                                ? user.address.complement
                                                : undefined
                                        }
                                    >
                                        <SANInput
                                            data-testid='flix_profile_tab-personal--input-complement'
                                            placeholder={t(
                                                'profile.tab2.complement.placeholder'
                                            )}
                                            size='large'
                                        />
                                    </SANFormItem>
                                    <SANRow gutter={24}>
                                        <SANCol xs={24} sm={12}>
                                            <SANFormItem
                                                name='address.city_name'
                                                label={t('profile.tab2.city')}
                                                mb='md'
                                                initialValue={
                                                    !!user.address
                                                        ? user.address.city_name
                                                        : undefined
                                                }
                                            >
                                                <SANInput
                                                    data-testid='flix_profile_tab-personal--select-state'
                                                    placeholder={t(
                                                        'profile.tab2.city'
                                                    )}
                                                    size='large'
                                                />
                                            </SANFormItem>
                                        </SANCol>
                                        <SANCol xs={24} sm={12}>
                                            <SANFormItem
                                                name='address.state_id'
                                                label={t(
                                                    'profile.tab2.state.label'
                                                )}
                                                mb='md'
                                                initialValue={
                                                    !!user.address
                                                        ? user.address.state_id
                                                        : undefined
                                                }
                                            >
                                                <SANSelect
                                                    placeholder={t(
                                                        'profile.tab2.state.placeholder'
                                                    )}
                                                    size='large'
                                                >
                                                    {states.map(renderState)}
                                                </SANSelect>
                                            </SANFormItem>
                                        </SANCol>
                                    </SANRow>
                                </SANBox>
                                <SANDivider mb='xl' bg='grey.1' />
                                <SANFormItem m={0}>
                                    <SANBox
                                        display='flex'
                                        justifyContent='center'
                                    >
                                        <SANButton
                                            variant='solid'
                                            color='primary'
                                            uppercase
                                            bold
                                            htmlType='submit'
                                        >
                                            {t('profile.save')}
                                        </SANButton>
                                    </SANBox>
                                </SANFormItem>
                            </SANForm>
                        </SANBox>
                    </SANTabPane>
                </SANTabs>
            </SANSpin>
        </SANBox>
    )
}

export default withSANForm<ProfileTabProps>(ProfileTab)
