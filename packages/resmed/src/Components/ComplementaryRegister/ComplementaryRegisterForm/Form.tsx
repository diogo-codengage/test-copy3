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

const RMForm = ({
    form,
    submitting,
    handleSubmit,
    profile,
    institutions,
    supplementarySpecialties
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
                            name='year'
                            initialValue={!!profile ? profile.year : undefined}
                            rules={[
                                {
                                    required: true,
                                    message: tComponents(
                                        'formValidateMessages.required'
                                    )
                                }
                            ]}
                            trigger={'onPanelChange'}
                            hasError={!!form.getFieldError('year')}
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
                            name='semester'
                            initialValue={
                                !!profile ? profile.semester : undefined
                            }
                            rules={[
                                {
                                    required: true,
                                    message: tComponents(
                                        'formValidateMessages.required'
                                    )
                                }
                            ]}
                            hasError={!!form.getFieldError('semester')}
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
                                    name='preparatoryCourseId'
                                    initialValue={
                                        !!profile
                                            ? profile.preparatoryCourseId
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
                                    <SANSelect
                                        placeholder={t(
                                            'userProfile.preparatoryCourse.whatt'
                                        )}
                                        size='large'
                                    >
                                        {[0, 1, 2, 3].map(item => (
                                            <SANSelectOption
                                                key={item}
                                                value={item}
                                            >
                                                items
                                            </SANSelectOption>
                                        ))}
                                    </SANSelect>
                                </SANStyledFormItem>
                            </SANCol>
                        )}
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
                            <SANStyledSelect
                                placeholder={t('userProfile.placeholder')}
                                size='large'
                            >
                                {[0, 1, 2, 3].map(item => (
                                    <SANSelectOption key={item} value={item}>
                                        items
                                    </SANSelectOption>
                                ))}
                            </SANStyledSelect>
                        </SANStyledFormItem>
                    </SANCol>
                </SANRow>
                <SANRow gutter={24}>
                    <SANCol>
                        <SANFormItem name='submitButton' mb='0'>
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
