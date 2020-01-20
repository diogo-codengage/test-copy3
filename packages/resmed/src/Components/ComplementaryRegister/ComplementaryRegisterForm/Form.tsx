import React from 'react'

import { useTranslation } from 'react-i18next'
import styled, { css } from 'styled-components'
import { theme, ifProp } from 'styled-tools'

import {
    SANCol,
    SANRow,
    SANForm,
    SANSpin,
    SANRadio,
    SANSelect,
    SANButton,
    SANFormItem,
    SANRadioGroup,
    SANSelectFilter,
    SANSelectOption,
    SANTypography,
    SANDatePicker
} from '@sanar/components'
import { useWindowSize } from '@sanar/utils/dist/Hooks'

import { IOwner } from 'Apollo/User/Queries/supplementary-items'

const SANStyledFormItem = styled(SANFormItem)<{ hasError?: boolean }>`
    &&& {
        ${ifProp(
            'hasError',
            css`
                margin-bottom: 5px !important;
            `,
            css`
                margin-bottom: ${theme('space.xxl')};
            `
        )}
    }
`

const SANStyledSelect = styled(SANSelect)`
    &&& {
        margin-top: ${theme('space.lg')};
    }
`

const SANStyledRadioGroup = styled(SANRadioGroup)`
    &&& {
        margin-top: ${theme('space.lg')};
    }
`

const SANStyledRadio = styled(SANRadio)`
    &&& {
        display: block;
        ${theme('mediaQueries.up.xs')} {
            display: inline-block;
            margin-top: 0;
            margin-bottom: 0;
        }
    }
`

const testExperiences = ['none', 'one', 'many']

const preparatoryCourseStatus = ['yes', 'no']

interface IFormProps {
    form: any
    submitting: boolean
    handleSubmit: (e: React.FormEvent) => void
    profile: any
    institutions?: IOwner[]
    questionCategories?: IOwner[]
    medResidencyCourses?: IOwner[]
    medProfessionalSpecialties?: IOwner[]
    medUniversities?: IOwner[]
}

const RMForm: React.FC<IFormProps> = ({
    form,
    submitting,
    handleSubmit,
    profile,
    institutions = [],
    questionCategories = [],
    medResidencyCourses = [],
    medProfessionalSpecialties = [],
    medUniversities = []
}) => {
    const { t } = useTranslation('resmed')
    const { t: tComponents } = useTranslation('components')
    const { width } = useWindowSize()

    return (
        <SANSpin spinning={submitting} flex>
            <SANForm form={form} onSubmit={handleSubmit}>
                <SANRow gutter={24}>
                    <SANCol>
                        <SANTypography fontWeight='bold' mb='md'>
                            {t('userProfile.graduatedStep.label')}
                        </SANTypography>
                    </SANCol>
                    <SANCol xs={24} sm={12}>
                        <SANStyledFormItem
                            name='ingressYear'
                            initialValue={
                                !!profile ? profile.ingressYear : undefined
                            }
                            rules={[
                                {
                                    required: true,
                                    message: tComponents(
                                        'formValidateMessages.required'
                                    )
                                }
                            ]}
                            trigger={'onPanelChange'}
                            hasError={!!form.getFieldError('ingressYear')}
                        >
                            <SANDatePicker
                                placeholder={t(
                                    'userProfile.graduatedStep.year'
                                )}
                                mode='year'
                                size='large'
                                format='YYYY'
                            />
                        </SANStyledFormItem>
                    </SANCol>
                    <SANCol xs={24} sm={12}>
                        <SANStyledFormItem
                            name='ingressSemester'
                            initialValue={
                                !!profile ? profile.ingressSemester : undefined
                            }
                            rules={[
                                {
                                    required: true,
                                    message: tComponents(
                                        'formValidateMessages.required'
                                    )
                                }
                            ]}
                            hasError={!!form.getFieldError('ingressSemester')}
                        >
                            <SANSelect
                                placeholder={t(
                                    'userProfile.graduatedStep.semester'
                                )}
                                size='large'
                            >
                                {[1, 2].map(item => (
                                    <SANSelectOption key={item} value={item}>
                                        {item}
                                    </SANSelectOption>
                                ))}
                            </SANSelect>
                        </SANStyledFormItem>
                    </SANCol>
                </SANRow>
                <SANRow gutter={24}>
                    <SANCol>
                        <SANStyledFormItem
                            name='medUniversityId'
                            label={t('userProfile.medUniversity')}
                            initialValue={
                                !!profile ? profile.medUniversityId : undefined
                            }
                            hasError={!!form.getFieldError('medUniversityId')}
                        >
                            <SANStyledSelect
                                placeholder={t('userProfile.placeholder')}
                                size='large'
                                allowClear
                            >
                                {medUniversities.map(item => (
                                    <SANSelectOption
                                        key={item.value}
                                        value={item.value}
                                    >
                                        {item.label}
                                    </SANSelectOption>
                                ))}
                            </SANStyledSelect>
                        </SANStyledFormItem>
                    </SANCol>
                    <SANCol>
                        <SANStyledFormItem
                            name='medInstitutionIds'
                            label={t('userProfile.institutions')}
                            initialValue={
                                !!profile
                                    ? profile.medInstitutionIds
                                    : undefined
                            }
                            hasError={!!form.getFieldError('medInstitutionIds')}
                        >
                            <SANSelectFilter
                                placeholder={t('userProfile.placeholder')}
                                items={institutions}
                                hasError={
                                    !!form.getFieldError('medInstitutionIds')
                                }
                                InputProps={{ size: 'large' }}
                                mt='md'
                            />
                        </SANStyledFormItem>
                    </SANCol>
                    <SANCol>
                        <SANStyledFormItem
                            name='medProfissionalSpecialtyIds'
                            label={t('userProfile.specialties')}
                            initialValue={
                                !!profile
                                    ? profile.medProfissionalSpecialtyIds
                                    : undefined
                            }
                            hasError={
                                !!form.getFieldError(
                                    'medProfissionalSpecialtyIds'
                                )
                            }
                        >
                            <SANSelectFilter
                                placeholder={t('userProfile.placeholder')}
                                items={medProfessionalSpecialties}
                                hasError={
                                    !!form.getFieldError(
                                        'medProfissionalSpecialtyIds'
                                    )
                                }
                                InputProps={{ size: 'large' }}
                                mt='md'
                            />
                        </SANStyledFormItem>
                    </SANCol>
                    <SANCol>
                        <SANStyledFormItem
                            name='hasPreviousResidencyExam'
                            label={t('userProfile.testExperiences.label')}
                            initialValue={
                                !!profile
                                    ? profile.hasPreviousResidencyExam
                                    : undefined
                            }
                            rules={[
                                {
                                    required: true,
                                    message: tComponents(
                                        'formValidateMessages.required'
                                    )
                                }
                            ]}
                            hasError={
                                !!form.getFieldError('hasPreviousResidencyExam')
                            }
                        >
                            <SANStyledRadioGroup mt='16px'>
                                {testExperiences.map(item => (
                                    <SANStyledRadio key={item} value={item}>
                                        {t(
                                            `userProfile.testExperiences.${item}`
                                        )}
                                    </SANStyledRadio>
                                ))}
                            </SANStyledRadioGroup>
                        </SANStyledFormItem>
                    </SANCol>
                    <SANCol>
                        <SANStyledFormItem
                            name='preparatoryCourseStatus'
                            label={t('userProfile.preparatoryCourse.label')}
                            initialValue={
                                !!profile
                                    ? profile.preparatoryCourseStatus
                                    : undefined
                            }
                            rules={[
                                {
                                    required: true,
                                    message: tComponents(
                                        'formValidateMessages.required'
                                    )
                                }
                            ]}
                            hasError={
                                !!form.getFieldError('preparatoryCourseStatus')
                            }
                        >
                            <SANStyledSelect
                                placeholder={t('userProfile.placeholder')}
                                size='large'
                            >
                                {preparatoryCourseStatus.map(item => (
                                    <SANSelectOption key={item} value={item}>
                                        {t(
                                            `userProfile.preparatoryCourse.${item}`
                                        )}
                                    </SANSelectOption>
                                ))}
                            </SANStyledSelect>
                        </SANStyledFormItem>
                    </SANCol>
                    {!!form &&
                        form.getFieldValue('preparatoryCourseStatus') ===
                            'yes' && (
                            <SANCol>
                                <SANStyledFormItem
                                    name='previousResidencyCourseId'
                                    label={t(
                                        'userProfile.previousResidencyCourse.label'
                                    )}
                                    initialValue={
                                        !!profile
                                            ? profile.previousResidencyCourseId
                                            : undefined
                                    }
                                    rules={[
                                        {
                                            required: true,
                                            message: tComponents(
                                                'formValidateMessages.required'
                                            )
                                        }
                                    ]}
                                    hasError={
                                        !!form.getFieldError(
                                            'preparatoryCourseId'
                                        )
                                    }
                                >
                                    <SANStyledSelect
                                        placeholder={t(
                                            'userProfile.placeholder'
                                        )}
                                        size='large'
                                    >
                                        {medResidencyCourses.map(item => (
                                            <SANSelectOption
                                                key={item.value}
                                                value={item.value}
                                            >
                                                {item.label}
                                            </SANSelectOption>
                                        ))}
                                    </SANStyledSelect>
                                </SANStyledFormItem>
                            </SANCol>
                        )}
                    <SANCol>
                        <SANStyledFormItem
                            name='examIntentionCategoryId'
                            label={t('userProfile.objective.label')}
                            initialValue={
                                !!profile
                                    ? profile.examIntentionCategoryId
                                    : undefined
                            }
                            rules={[
                                {
                                    required: true,
                                    message: tComponents(
                                        'formValidateMessages.required'
                                    )
                                }
                            ]}
                            hasError={
                                !!form.getFieldError('examIntentionCategoryId')
                            }
                        >
                            <SANStyledSelect
                                placeholder={t('userProfile.placeholder')}
                                size='large'
                            >
                                {questionCategories.map(item => (
                                    <SANSelectOption
                                        key={item.value}
                                        value={item.value}
                                    >
                                        {item.label}
                                    </SANSelectOption>
                                ))}
                            </SANStyledSelect>
                        </SANStyledFormItem>
                    </SANCol>
                </SANRow>
                <SANRow gutter={24}>
                    <SANCol>
                        <SANFormItem mb='0'>
                            <SANButton
                                mt='md'
                                mx='auto'
                                size='small'
                                variant='solid'
                                color='primary'
                                uppercase
                                block={width < 576}
                                bold
                                type='submit'
                            >
                                {t(
                                    `userProfile.${
                                        !!profile && !!profile.id
                                            ? 'pageSubmit'
                                            : 'modalSubmit'
                                    }`
                                )}
                            </SANButton>
                        </SANFormItem>
                    </SANCol>
                </SANRow>
            </SANForm>
        </SANSpin>
    )
}

export default RMForm
