import React from 'react'

import { useTranslation } from 'react-i18next'
import styled, { css } from 'styled-components'
import { theme, ifProp } from 'styled-tools'

import {
    SANCol,
    SANRow,
    SANForm,
    SANSpin,
    SANInput,
    SANRadio,
    SANSelect,
    SANButton,
    SANFormItem,
    SANRadioGroup,
    SANSelectFilter,
    SANSelectOption
} from '@sanar/components'
import { useWindowSize } from '@sanar/utils/dist/Hooks'

const SANCourseStatusFormItem = styled(SANFormItem)<{ rcn?: boolean }>`
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

const SANStyledFormItem = styled(SANFormItem)`
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

const SANStyledRadio = styled(SANRadio)<{ nd?: boolean }>`
    &&& {
        display: block;
        ${ifProp(
            'nd',
            css`
                margin-top: ${theme('space.sm')};
                margin-bottom: ${theme('space.sm')};
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

const objectives = ['college', 'residence', 'revalidate']

const preparatoryCourseStatus = ['missing', 'inProgress', 'completed']

const RMForm = ({
    form,
    submitting,
    handleSubmit,
    profile,
    institutions,
    supplementarySpecialties,
    testValue,
    setTestValue,
    rcn,
    setRcn
}) => {
    const { t } = useTranslation('resmed')
    const { t: tComponents } = useTranslation('components')
    const { width } = useWindowSize()

    return (
        <SANSpin spinning={submitting} flex>
            <SANForm form={form} onSubmit={handleSubmit}>
                <SANRow gutter={24}>
                    <SANCol>
                        <SANStyledFormItem
                            name='graduationStep'
                            label={t('userProfile.graduatedStep.label')}
                            initialValue={
                                !!profile ? profile.graduationStep : undefined
                            }
                            rules={[
                                {
                                    required: true,
                                    message: tComponents(
                                        'formValidateMessages.required'
                                    )
                                }
                            ]}
                            hasError={!!form.getFieldError('graduationStep')}
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
                        </SANStyledFormItem>
                    </SANCol>
                </SANRow>
                <SANRow gutter={24}>
                    <SANCol>
                        <SANStyledFormItem
                            name='institutionIds'
                            label={t('userProfile.institutions')}
                            initialValue={
                                !!profile ? profile.institutionIds : undefined
                            }
                            hasError={!!form.getFieldError('institutionIds')}
                        >
                            <SANSelectFilter
                                placeholder={t('userProfile.placeholder')}
                                items={institutions}
                                hasError={
                                    !!form.getFieldError('institutionIds')
                                }
                                InputProps={{ size: 'large' }}
                                mt='md'
                            />
                        </SANStyledFormItem>
                    </SANCol>
                </SANRow>
                <SANRow gutter={24}>
                    <SANCol>
                        <SANStyledFormItem
                            name='specialtyIds'
                            label={t('userProfile.specialties')}
                            initialValue={
                                !!profile ? profile.specialtyIds : undefined
                            }
                            hasError={!!form.getFieldError('specialtyIds')}
                        >
                            <SANSelectFilter
                                placeholder={t('userProfile.placeholder')}
                                items={supplementarySpecialties}
                                hasError={!!form.getFieldError('specialtyIds')}
                                InputProps={{ size: 'large' }}
                                mt='md'
                            />
                        </SANStyledFormItem>
                    </SANCol>
                </SANRow>
                <SANRow gutter={24}>
                    <SANCol>
                        <SANStyledFormItem
                            name='testExperience'
                            label={t('userProfile.testExperiences.label')}
                            initialValue={
                                !!profile ? profile.testExperience : undefined
                            }
                            rules={[
                                {
                                    required: true,
                                    message: tComponents(
                                        'formValidateMessages.required'
                                    )
                                }
                            ]}
                            hasError={!!form.getFieldError('testExperience')}
                        >
                            <SANStyledRadioGroup
                                mt='16px'
                                value={testValue}
                                onChange={e => setTestValue(e.target.value)}
                            >
                                {testExperiences.map(item => (
                                    <SANStyledRadio
                                        key={item}
                                        nd={item === testExperiences[1]}
                                        value={item}
                                    >
                                        {t(
                                            `userProfile.testExperiences.${item}`
                                        )}
                                    </SANStyledRadio>
                                ))}
                            </SANStyledRadioGroup>
                        </SANStyledFormItem>
                    </SANCol>
                </SANRow>
                <SANRow gutter={24}>
                    <SANCol>
                        <SANCourseStatusFormItem
                            name='preparatoryCourseStatus'
                            label={t('userProfile.preparatoryCourse.label')}
                            initialValue={
                                !!profile
                                    ? profile.preparatoryCourseStatus
                                    : undefined
                            }
                            rcn={rcn}
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
                                required
                                placeholder={t('userProfile.placeholder')}
                                size='large'
                                onChange={item =>
                                    setRcn(item !== preparatoryCourseStatus[0])
                                }
                            >
                                {preparatoryCourseStatus.map(item => (
                                    <SANSelectOption key={item} value={item}>
                                        {t(
                                            `userProfile.preparatoryCourse.${item}`
                                        )}
                                    </SANSelectOption>
                                ))}
                            </SANStyledSelect>
                        </SANCourseStatusFormItem>
                    </SANCol>
                </SANRow>
                {rcn && rcn !== 'missing' && (
                    <SANRow gutter={24}>
                        <SANCol>
                            <SANStyledFormItem
                                name='preparatoryCourseName'
                                initialValue={
                                    !!profile
                                        ? profile.preparatoryCourseName
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
                                        'preparatoryCourseName'
                                    )
                                }
                            >
                                <SANInput
                                    size='large'
                                    placeholder={t(
                                        'userProfile.preparatoryCourse.inputLabel'
                                    )}
                                />
                            </SANStyledFormItem>
                        </SANCol>
                    </SANRow>
                )}
                <SANRow gutter={24}>
                    <SANCol>
                        <SANStyledFormItem
                            name='objective'
                            label={t('userProfile.objective.label')}
                            initialValue={
                                !!profile ? profile.objective : undefined
                            }
                            rules={[
                                {
                                    required: true,
                                    message: tComponents(
                                        'formValidateMessages.required'
                                    )
                                }
                            ]}
                            hasError={!!form.getFieldError('objective')}
                        >
                            <SANStyledRadioGroup
                                mt='16px'
                                value={testValue}
                                onChange={e => setTestValue(e.target.value)}
                            >
                                {objectives.map(item => (
                                    <SANStyledRadio
                                        key={item}
                                        nd={item === objectives[1]}
                                        value={item}
                                    >
                                        {t(`userProfile.objective.${item}`)}
                                    </SANStyledRadio>
                                ))}
                            </SANStyledRadioGroup>
                        </SANStyledFormItem>
                    </SANCol>
                </SANRow>
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
                        </SANSTyledButtonFormItem>
                    </SANCol>
                </SANRow>
            </SANForm>
        </SANSpin>
    )
}

export default RMForm
