import React from 'react'

import { useTranslation } from 'react-i18next'

import { SANBox } from '../../Atoms/Box'
import { SANDivider } from '../../Atoms/Divider'
import { SANSelect, SANSelectOption } from '../../Atoms/Select'
import { SANInput } from '../../Atoms/Input'
import { SANInputMask } from '../../Atoms/InputMask'
import { SANButton } from '../../Atoms/Button'
import { SANRow, SANCol } from '../../Molecules/Grid'
import { SANTabs, SANTabPane } from '../../Molecules/Tabs'
import { SANForm, SANFormItem, withSANForm } from '../../Molecules/Form'

import { IUser } from './Profile'

export interface ProfileTabProps {
    user: any
    form: any
}

const semesters = new Array(12).fill(1).map((_, i) => i + 1)

const renderSemester = (item, index) => (
    <SANSelectOption key={index} value={item}>
        {item}
    </SANSelectOption>
)

const ProfileTab = ({ user = {}, form }: ProfileTabProps) => {
    const { t } = useTranslation('components')

    return (
        <SANBox
            bg='white.10'
            borderRadius='base'
            border='1px solid'
            borderColor='grey.2'
            boxShadow='1'
        >
            <SANTabs defaultActiveKey='1' center>
                <SANTabPane tab={t('profile.tab1.title')} key='1'>
                    <SANBox p='xl'>
                        <SANForm form={form} onSubmit={console.log}>
                            <SANBox px={{ sm: '9', _: 0 }}>
                                <SANFormItem
                                    name='name'
                                    label={t('profile.tab1.name')}
                                    initialValue={user.name || ''}
                                >
                                    <SANInput
                                        placeholder={t('profile.tab1.name')}
                                        size='large'
                                    />
                                </SANFormItem>
                                <SANFormItem
                                    name='document'
                                    label={t('profile.tab1.document')}
                                    initialValue={user.document || ''}
                                >
                                    <SANInput
                                        placeholder={t('profile.tab1.document')}
                                        size='large'
                                        disabled
                                        iconRight='slash-outline'
                                    />
                                </SANFormItem>
                                <SANFormItem
                                    name='phone'
                                    label={t('profile.tab1.phone')}
                                    initialValue={user.phone || ''}
                                >
                                    <SANInputMask
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
                                    <SANCol xs={12}>
                                        <SANFormItem
                                            name='college'
                                            label={t('profile.tab1.college')}
                                            mb='md'
                                            initialValue={user.college || ''}
                                        >
                                            <SANInput
                                                placeholder={t(
                                                    'profile.tab1.college'
                                                )}
                                                size='large'
                                            />
                                        </SANFormItem>
                                    </SANCol>
                                    <SANCol xs={12}>
                                        <SANFormItem
                                            name='semester'
                                            label={t('profile.tab1.semester')}
                                            mb='md'
                                            initialValue={user.semester || ''}
                                        >
                                            <SANSelect
                                                placeholder={t(
                                                    'profile.tab1.semester'
                                                )}
                                                size='large'
                                            >
                                                {semesters.map(renderSemester)}
                                            </SANSelect>
                                        </SANFormItem>
                                    </SANCol>
                                </SANRow>
                            </SANBox>
                            <SANDivider mb='xl' bg='grey.1' />
                            <SANFormItem m={0}>
                                <SANBox display='flex' justifyContent='center'>
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
                <SANTabPane tab={t('profile.tab2.title')} key='2'>
                    <SANBox p='xl'>
                        <SANForm form={form} onSubmit={console.log}>
                            <SANBox px={{ sm: '9', _: 0 }}>
                                <SANFormItem
                                    name='postalCode'
                                    label={t('profile.tab2.postalCode')}
                                    initialValue={user.postalCode || ''}
                                >
                                    <SANInputMask
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
                                    name='address'
                                    label={t('profile.tab2.address')}
                                    initialValue={user.address || ''}
                                >
                                    <SANInput
                                        placeholder={t('profile.tab2.address')}
                                        size='large'
                                    />
                                </SANFormItem>
                                <SANFormItem
                                    name='neighborhood'
                                    label={t('profile.tab2.neighborhood')}
                                    initialValue={user.neighborhood || ''}
                                >
                                    <SANInput
                                        placeholder={t(
                                            'profile.tab2.neighborhood'
                                        )}
                                        size='large'
                                    />
                                </SANFormItem>
                                <SANFormItem
                                    name='complement'
                                    label={t('profile.tab2.complement.label')}
                                    initialValue={user.complement || ''}
                                >
                                    <SANInput
                                        placeholder={t(
                                            'profile.tab2.complement.placeholder'
                                        )}
                                        size='large'
                                    />
                                </SANFormItem>
                                <SANRow gutter={24}>
                                    <SANCol xs={12}>
                                        <SANFormItem
                                            name='city'
                                            label={t('profile.tab2.city')}
                                            mb='md'
                                            initialValue={user.city || ''}
                                        >
                                            <SANInput
                                                placeholder={t(
                                                    'profile.tab2.city'
                                                )}
                                                size='large'
                                            />
                                        </SANFormItem>
                                    </SANCol>
                                    <SANCol xs={12}>
                                        <SANFormItem
                                            name='state'
                                            label={t('profile.tab2.state')}
                                            mb='md'
                                            initialValue={user.state || ''}
                                        >
                                            <SANSelect
                                                placeholder={t(
                                                    'profile.tab2.state'
                                                )}
                                                size='large'
                                            ></SANSelect>
                                        </SANFormItem>
                                    </SANCol>
                                </SANRow>
                            </SANBox>
                            <SANDivider mb='xl' bg='grey.1' />
                            <SANFormItem m={0}>
                                <SANBox display='flex' justifyContent='center'>
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
        </SANBox>
    )
}

export default withSANForm(ProfileTab)
