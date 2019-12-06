import React, { useState } from 'react'

import { useTranslation } from 'react-i18next'

import {
    SANCol,
    SANRow,
    SANForm,
    SANInput,
    SANSelect,
    SANButton,
    withSANForm,
    SANFormItem,
    SANRadio,
    SANSelectFilter,
    SANSelectOption,
    SANRadioGroup
} from '@sanar/components'

import styled, { css } from 'styled-components'
import { theme, ifProp } from 'styled-tools'

const SANCourseStatusFormItem = styled(SANFormItem)<{
    requireCurseName?: boolean
}>`
    &&& {
        ${ifProp(
            'requireCurseName',
            css`
                margin-bottom: 12px;
            `,
            css`
                margin-bottom: 32px;
            `
        )}
    }
`

const SANStyledSelect = styled(SANSelect)`
    &&& {
        margin-top: 16px;
    }
`

const SANStyledRadioGroup = styled(SANRadioGroup)`
    &&& {
        margin-top: 16px;
    }
`

const SANStyledRadio = styled(SANRadio)<{
    second?: boolean
}>`
    &&& {
        display: block;
        ${ifProp(
            'second',
            css`
                margin-top: 12px;
                margin-bottom: 12px;
            `,
            css`
                margin-top: 0;
                margin-bottom: 0;
            `
        )}
        ${theme('mediaQueries.up.xs')} {
            display: inline-block;
            margin-top: 0;
            margin-bottom: 0;
        }
    }
`

const SANSTyledButtonFormItem = styled(SANFormItem)`
    &&& {
        margin-bottom: 0;
    }
`

interface IFormDataProps {
    graduatedStep?: string
    institutionIds?: [
        {
            id: number
            name: string
        }
    ]
    specialtyIds?: [
        {
            id: number
            name: string
        }
    ]
    testExperience?: string
    preparatoryCourseStatus?: string
    preparatoryCourseName?: string
    modal?: boolean
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

const preparatoryCourseStatus = ['missing', 'in_progress', 'completed']

const RMForm = ({ data = {} as IFormDataProps, handleSubmit, form }) => {
    const { t } = useTranslation('resmed')
    const [requireCurseName, setRequireCurseName] = useState(false)

    return (
        <SANForm form={form} onSubmit={handleSubmit}>
            <SANRow gutter={24}>
                <SANCol>
                    <SANFormItem
                        name='graduatedStep'
                        label={t('userProfile.graduatedStep.label')}
                        initialValue={!!data ? data.graduatedStep : undefined}
                        // rules={[{ required: true }]}
                    >
                        <SANStyledSelect
                            required
                            placeholder={t('userProfile.placeholder')}
                            size='large'
                        >
                            {graduatedSteps.map(item => (
                                <SANSelectOption key={item}>
                                    {t(`userProfile.graduatedStep.${item}`)}
                                </SANSelectOption>
                            ))}
                        </SANStyledSelect>
                    </SANFormItem>
                </SANCol>
            </SANRow>
            <SANRow gutter={24}>
                <SANCol>
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
                            mt='md'
                        />
                    </SANFormItem>
                </SANCol>
            </SANRow>

            <SANRow gutter={24}>
                <SANCol>
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
                            mt='md'
                        />
                    </SANFormItem>
                </SANCol>
            </SANRow>
            <SANRow gutter={24}>
                <SANCol>
                    <SANFormItem
                        name='testExperiences'
                        label={t('userProfile.testExperiences.label')}
                        // rules={[{ required: true }]}
                        valuePropName='check'
                    >
                        <SANStyledRadioGroup
                            mt='16px'
                            defaultValue={testExperiences[0]}
                        >
                            {testExperiences.map(item => (
                                <SANStyledRadio
                                    second={item === testExperiences[1]}
                                    value={item}
                                >
                                    {t(`userProfile.testExperiences.${item}`)}
                                </SANStyledRadio>
                            ))}
                        </SANStyledRadioGroup>
                    </SANFormItem>
                </SANCol>
            </SANRow>
            <SANRow gutter={24}>
                <SANCol>
                    <SANCourseStatusFormItem
                        name='preparatoryCourse'
                        label={t('userProfile.preparatoryCourse.label')}
                        initialValue={
                            !!data ? data.preparatoryCourseStatus : undefined
                        }
                        requireCurseName={requireCurseName}
                        // rules={[{ required: true }]}
                    >
                        <SANStyledSelect
                            required
                            placeholder={t('userProfile.placeholder')}
                            size='large'
                            onChange={item =>
                                setRequireCurseName(
                                    item !== preparatoryCourseStatus[0]
                                )
                            }
                        >
                            {preparatoryCourseStatus.map(item => (
                                <SANSelectOption key={item} value={item}>
                                    {t(`userProfile.preparatoryCourse.${item}`)}
                                </SANSelectOption>
                            ))}
                        </SANStyledSelect>
                    </SANCourseStatusFormItem>
                </SANCol>
            </SANRow>
            {requireCurseName && (
                <SANRow gutter={24}>
                    <SANCol>
                        <SANFormItem
                            name='preparatoryCourseName'
                            initialValue={
                                !!data ? data.preparatoryCourseName : undefined
                            }
                            // rules={[{ required: true }]}
                        >
                            <SANInput
                                size='large'
                                placeholder={t(
                                    'userProfile.preparatoryCourse.inputLabel'
                                )}
                            />
                        </SANFormItem>
                    </SANCol>
                </SANRow>
            )}
            <SANRow gutter={24}>
                <SANCol>
                    <SANSTyledButtonFormItem name='submitButton'>
                        <SANButton
                            mt='md'
                            mx='auto'
                            size='small'
                            variant='solid'
                            color='primary'
                            uppercase
                            bold
                            onClick={false}
                        >
                            {t(
                                `userProfile.${
                                    data.modal ? 'modalSubmit' : 'pageSubmit'
                                }`
                            )}
                        </SANButton>
                    </SANSTyledButtonFormItem>
                </SANCol>
            </SANRow>
        </SANForm>
    )
}

export default withSANForm<IFormProps>(RMForm)
