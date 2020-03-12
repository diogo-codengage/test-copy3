import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { format } from 'date-fns'

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

import { IUser, IState, IUniversity } from './Profile'

interface IParams {
    setSubmitting: React.Dispatch<React.SetStateAction<boolean>>
}

export interface ProfileTabProps {
    states: IState[]
    universities?: IUniversity[]
    user?: IUser
    onSubmit?: (user: IUser, params: IParams) => void
    form: any
}

const renderOption = (item, index) => (
    <SANSelectOption key={index} value={item}>
        {item}
    </SANSelectOption>
)

const renderState = state => (
    <SANSelectOption key={state.id} value={state.id}>
        {state.name}
    </SANSelectOption>
)

const ProfileTab = ({ user = {} as IUser, onSubmit, states, universities, form }) => {
    const { width } = useWindowSize()
    const { t } = useTranslation('components')
    const [submitting, setSubmitting] = useState(false)
    const [otherMethodology, setOtherMethodology] = useState<boolean>(false)

    const semesters = () => {
        const currentYear = new Date().getFullYear()
        let startYear = 2011
        const semesters: string[] = []
        while (startYear <= currentYear) {
            semesters.push(String(startYear) + '.1', String(startYear) + '.2')
            startYear++
        }
        return semesters.reverse()
    }

    const methodologies = Object.freeze([
        'Tradicional',
        'PBL - Problem Based Learning',
        'TBL - Team Based Learning',
        'Outra'
    ])

    const onChangeMethodology = (value) => setOtherMethodology(value === 'Outra')

    const ingressPeriod = () => {
        if (user.userMedUniversity && user.userMedUniversity.ingressSemester && user.userMedUniversity.ingressYear) {
            const year = format(new Date(user.userMedUniversity.ingressYear), 'yyyy')
            return `${year}.${user.userMedUniversity.ingressSemester}`
        }
    }

    const university = () => {
        if (user.userMedUniversity && user.userMedUniversity.medUniversity) {
            return user.userMedUniversity.medUniversity.id
        }
    }

    const handleSubmit = e => {
        e.preventDefault()
        setSubmitting(true)
        form.validateFields((err, values) => {
            if (!err) {
                onSubmit(
                    {
                        ...values
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
                                    {universities.length > 0 && (
                                        <SANFormItem
                                            name='university'
                                            label={t(
                                                'profile.tab1.university.label'
                                            )}
                                            mb='md'
                                            initialValue={
                                                university() || undefined
                                            }
                                        >
                                            <SANSelect
                                                showSearch
                                                optionFilterProp="children"
                                                data-testid='flix_profile_tab-personal--select-university'
                                                placeholder={t(
                                                    'profile.tab1.university.placeholder'
                                                )}
                                                size='large'
                                            >
                                                {universities.map((item, index) =>
                                                    <SANSelectOption
                                                        key={index}
                                                        value={item.id}
                                                    >
                                                        {item.name}
                                                    </SANSelectOption>
                                                )}
                                            </SANSelect>
                                        </SANFormItem>
                                    )}
                                    <SANFormItem
                                        name='ingressPeriod'
                                        label={t(
                                            'profile.tab1.ingressPeriod.label'
                                        )}
                                        mb='md'
                                        initialValue={
                                            ingressPeriod() || undefined
                                        }
                                    >
                                        <SANSelect
                                            data-testid='flix_profile_tab-personal--select-ingressPeriod'
                                            placeholder={t(
                                                'profile.tab1.ingressPeriod.placeholder'
                                            )}
                                            size='large'
                                        >
                                            {semesters().map(
                                                renderOption
                                            )}
                                        </SANSelect>
                                    </SANFormItem>
                                    <SANFormItem
                                        name='methodology'
                                        label={t(
                                            'profile.tab1.methodology.label'
                                        )}
                                        mb='md'
                                        initialValue={
                                            user.userMedUniversity && user.userMedUniversity.methodology
                                                ? user.userMedUniversity.methodology
                                                : undefined
                                        }
                                    >
                                        <SANSelect
                                            data-testid='flix_profile_tab-personal--select-methodology'
                                            placeholder={t(
                                                'profile.tab1.methodology.placeholder'
                                            )}
                                            size='large'
                                            onChange={onChangeMethodology}
                                        >
                                            {methodologies.map(
                                                renderOption
                                            )}
                                        </SANSelect>
                                    </SANFormItem>
                                    {otherMethodology ? (
                                        <SANFormItem
                                            name='newMethodology'
                                            mb='md'
                                        >
                                            <SANInput
                                                size='large'
                                                placeholder={t('profile.tab1.methodology.newPlaceholder')}
                                            />
                                        </SANFormItem>
                                    ) : null}
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
