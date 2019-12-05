import React, { useState, useRef, useMemo } from 'react'

import { useTranslation } from 'react-i18next'

import {
    SANBox,
    SANCol,
    SANRow,
    SANForm,
    SANPage,
    SANInput,
    SANModal,
    SANSelect,
    SANButton,
    withSANForm,
    SANFormItem,
    SANRadioButton,
    SANSelectFilter,
    SANSelectOption
} from '@sanar/components'

import styled from 'styled-components'
import { theme } from 'styled-tools'

interface IFormDataProps {
    graduatedStep?: string
    institutionIds: [
        {
            id: number
            name: string
        }
    ]
    specialtyIds: [
        {
            id: number
            name: string
        }
    ]
    testExperience: string
    preparatoryCourseStatus?: string
    preparatoryCourseName?: string
}
interface IFormProps {
    form: any
}

const graduatedSteps = [
    'firstYear',
    'secondYear',
    'thirdYear',
    'fourthYear',
    'fifthYear',
    'sixthYear',
    'formed'
]

const testExperiences = ['none', 'one', 'many']

const test = [
    { label: 'teste0', value: 'teste0' },
    { label: 'teste1', value: 'teste1' },
    { label: 'teste2', value: 'teste2' },
    { label: 'teste3', value: 'teste3' },
    { label: 'teste4', value: 'teste4' },
    { label: 'teste5', value: 'teste5' },
    { label: 'teste6', value: 'teste6' },
    { label: 'teste7', value: 'teste7' },
    { label: 'teste8', value: 'teste8' },
    { label: 'teste9', value: 'teste9' }
]

// const preparatoryCourseStatus = [
//     { value: 'missing', label: t('userProfile.preaparatoryCourse.missing') },
//     {
//         value: 'in_progress',
//         label: t('userProfile.preaparatoryCourse.in_progress')
//     },
//     { value: 'completed', label: t('userProfile.preaparatoryCourse.completed') }
// ]

const RMForm = ({ data = {} as IFormDataProps, handleSubmit, form }) => {
    const { t } = useTranslation('resmed')
    const [institutionsSelecteds, setInstitutionsSelecteds] = useState([])

    const handleChangeInstitutions = (selecteds, event) => {
        console.log('handleChangeInstitutions', selecteds)
        setInstitutionsSelecteds(selecteds)
    }

    return (
        <SANForm form={form} onSubmit={handleSubmit}>
            <SANRow gutter={24}>
                <SANCol xs={16} sm={9} lg={13}>
                    <SANFormItem
                        name='graduatedStep'
                        label={t('userProfile.graduatedStep.label')}
                        initialValue={!!data ? data.graduatedStep : undefined}
                        // rules={[{ required: true }]}
                    >
                        <SANSelect
                            required
                            placeholder={t('userProfile.placeholder')}
                            size='large'
                        >
                            {graduatedSteps.map(item => (
                                <SANSelectOption key={item}>
                                    {t(`userProfile.graduatedStep.${item}`)}
                                </SANSelectOption>
                            ))}
                        </SANSelect>
                    </SANFormItem>
                </SANCol>
            </SANRow>
            <SANRow gutter={24}>
                <SANCol xs={16} sm={9} lg={13}>
                    <SANFormItem
                        name='institutions'
                        label={t('userProfile.institutions')}
                        initialValue={!!data ? data.institutionIds : undefined}
                        // rules={[{ required: true }]}
                    >
                        <SANSelectFilter
                            placeholder={t('userProfile.placeholder')}
                            items={test}
                            InputProps={{ size: 'large' }}
                        />
                    </SANFormItem>
                </SANCol>
            </SANRow>

            <SANRow gutter={24}>
                <SANCol xs={16} sm={9} lg={13}>
                    <SANFormItem
                        name='specialties'
                        label={t('userProfile.specialties')}
                        initialValue={!!data ? data.specialtyIds : undefined}
                        // rules={[{ required: true }]}
                    >
                        <SANSelectFilter
                            placeholder={t('userProfile.placeholder')}
                            items={test}
                            InputProps={{ size: 'large' }}
                        />
                    </SANFormItem>
                </SANCol>
            </SANRow>
            {/*
            <SANRow gutter={24}>
                <SANCol xs={16} sm={9} lg={13}>
                    <SANFormItem
                        name='card_number'
                        label={t('userProfile.graduatedStep.label')}
                        initialValue={!!data ? data.graduatedStep : undefined}
                        // rules={[{ required: true }]}
                    >
                        <SANSelect
                            required
                            placeholder={t('userProfile.placeholder')}
                            size='large'
                        >
                            {graduatedSteps.map(item => (
                                <SANSelectOption key={item}>
                                    {t(`userProfile.graduatedStep.${item}`)}
                                </SANSelectOption>
                            ))}
                        </SANSelect>
                    </SANFormItem>
                </SANCol>
            </SANRow>
            <SANRow gutter={24}>
                <SANCol xs={16} sm={9} lg={13}>
                    <SANFormItem
                        name='card_number'
                        label={t('userProfile.graduatedStep.label')}
                        initialValue={!!data ? data.graduatedStep : undefined}
                        // rules={[{ required: true }]}
                    >
                        <SANSelect
                            required
                            placeholder={t('userProfile.placeholder')}
                            size='large'
                        >
                            {graduatedSteps.map(item => (
                                <SANSelectOption key={item}>
                                    {t(`userProfile.graduatedStep.${item}`)}
                                </SANSelectOption>
                            ))}
                        </SANSelect>
                    </SANFormItem>
                </SANCol>
            </SANRow> */}
        </SANForm>
    )
}

export default withSANForm<IFormProps>(RMForm)
