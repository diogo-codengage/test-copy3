import React from 'react'

import { SANBox } from '../../Atoms/Box'
import { SANDivider } from '../../Atoms/Divider'
import { SANInput } from '../../Atoms/Input'
import { SANInputMask } from '../../Atoms/InputMask'
import { SANButton } from '../../Atoms/Button'
import { SANRow, SANCol } from '../../Molecules/Grid'
import { SANTabs, SANTabPane } from '../../Molecules/Tabs'
import { SANForm, SANFormItem, withSANForm } from '../../Molecules/Form'

import { IUser } from './Profile'

export interface ProfileTabProps {
    user: IUser
    form: any
}

const ProfileTab = ({ form }: ProfileTabProps) => {
    return (
        <SANBox
            bg='white.10'
            borderRadius='base'
            border='1px solid'
            borderColor='grey.2'
            boxShadow='1'
        >
            <SANTabs defaultActiveKey='1' center>
                <SANTabPane tab='Dados pessoais' key='1'>
                    <SANBox p='xl'>
                        <SANForm form={form} onSubmit={console.log}>
                            <SANBox px={{ sm: '9', _: 0 }}>
                                <SANFormItem name='name' label='Nome'>
                                    <SANInput placeholder='Nome' size='large' />
                                </SANFormItem>
                                <SANFormItem name='document' label='CPF'>
                                    <SANInput
                                        placeholder='CPF'
                                        size='large'
                                        disabled
                                        iconRight='slash-outline'
                                    />
                                </SANFormItem>
                                <SANFormItem name='phone' label='Celular'>
                                    <SANInputMask
                                        mask='PHONE'
                                        InputProps={{
                                            placeholder: 'Celular',
                                            size: 'large'
                                        }}
                                    />
                                </SANFormItem>
                                <SANRow gutter={24}>
                                    <SANCol xs={12}>
                                        <SANFormItem
                                            name='college'
                                            label='Faculdade'
                                            mb='md'
                                        >
                                            <SANInput
                                                placeholder='Faculdade'
                                                size='large'
                                            />
                                        </SANFormItem>
                                    </SANCol>
                                    <SANCol xs={12}>
                                        <SANFormItem
                                            name='semester'
                                            label='Semestre'
                                            mb='md'
                                        >
                                            <SANInput
                                                placeholder='Semestre'
                                                size='large'
                                            />
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
                                        Salvar alterações
                                    </SANButton>
                                </SANBox>
                            </SANFormItem>
                        </SANForm>
                    </SANBox>
                </SANTabPane>
                <SANTabPane tab='Dados de Endereço' key='2'>
                    <SANBox p='xl'>
                        <SANForm form={form} onSubmit={console.log}>
                            <SANBox px={{ sm: '9', _: 0 }}>
                                <SANFormItem name='name' label='CEP'>
                                    <SANInputMask
                                        mask='POSTAL_CODE'
                                        InputProps={{
                                            placeholder: 'CEP',
                                            size: 'large'
                                        }}
                                    />
                                </SANFormItem>
                                <SANFormItem name='address' label='Endereço'>
                                    <SANInput
                                        placeholder='Endereço'
                                        size='large'
                                    />
                                </SANFormItem>
                                <SANFormItem name='neighborhood' label='Bairro'>
                                    <SANInput
                                        placeholder='Bairro'
                                        size='large'
                                    />
                                </SANFormItem>
                                <SANFormItem
                                    name='complement'
                                    label='Complemento'
                                >
                                    <SANInput
                                        placeholder='Casa, apartamento...'
                                        size='large'
                                    />
                                </SANFormItem>
                                <SANRow gutter={24}>
                                    <SANCol xs={12}>
                                        <SANFormItem
                                            name='city'
                                            label='Cidade'
                                            mb='md'
                                        >
                                            <SANInput
                                                placeholder='Cidade'
                                                size='large'
                                            />
                                        </SANFormItem>
                                    </SANCol>
                                    <SANCol xs={12}>
                                        <SANFormItem
                                            name='state'
                                            label='Estado'
                                            mb='md'
                                        >
                                            <SANInput
                                                placeholder='Estado'
                                                size='large'
                                            />
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
                                        Salvar alterações
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
