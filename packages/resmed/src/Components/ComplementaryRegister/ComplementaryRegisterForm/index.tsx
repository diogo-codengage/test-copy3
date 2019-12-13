import React, { useState, useEffect } from 'react'

import { useTranslation } from 'react-i18next'

import { useApolloClient } from '@apollo/react-hooks'
import { useAuthContext } from 'Hooks/auth'
import { useWindowSize } from '@sanar/utils/dist/Hooks'

import {
    SANCol,
    SANRow,
    SANForm,
    SANSpin,
    SANInput,
    SANRadio,
    SANSelect,
    SANButton,
    withSANForm,
    SANFormItem,
    SANRadioGroup,
    SANSelectFilter,
    SANSelectOption,
    useSnackbarContext
} from '@sanar/components'

import styled, { css } from 'styled-components'
import { theme, ifProp } from 'styled-tools'

import {
    CREATE_PROFILE_MUTATION,
    UPDATE_PROFILE_MUTATION
} from 'Apollo/User/Mutations/profile'
import { UPDATE_COURSE_ACCESSED } from 'Apollo/User/Mutations/course-accessed'

const SANCourseStatusFormItem = styled(SANFormItem)<{ rcn?: boolean }>`
    &&& {
        ${ifProp(
            'rcn',
            css`
                margin-bottom: 12px;
            `,
            css`
                margin-bottom: 24px;
            `
        )}
    }
`

const SANStyledFormItem = styled(SANFormItem)`
    &&&&& {
        ${ifProp(
            'hasError',
            css`
                margin-bottom: 5px !important;
            `,
            css`
                margin-bottom: 24px;
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

const SANStyledRadio = styled(SANRadio)<{ nd?: boolean }>`
    &&& {
        display: block;
        ${ifProp(
            'nd',
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

export interface IFormDataProps {
    id?: string
    graduationStep: string
    institutionIds: [
        {
            id: string
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
    preparatoryCourseStatus: string
    preparatoryCourseName?: string
}
interface IFormProps {
    form: any
}
export interface IListProps {
    label: string
    value: number | string
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

const preparatoryCourseStatus = ['missing', 'inProgress', 'completed']

const RMForm = ({
    oldData = {} as IFormDataProps,
    form,
    specialties = [] as IListProps[],
    institutions = [] as IListProps[],
    closeModal
}) => {
    const client = useApolloClient()
    const { t } = useTranslation('resmed')
    const { width } = useWindowSize()
    const [rcn, setRcn] = useState(false) //requiredCourseName
    const [submitting, setSubmitting] = useState(false)
    const snackbar = useSnackbarContext()
    const { setMe, setActiveCourse } = useAuthContext()

    useEffect(() => {
        if (!!oldData.graduationStep) {
            setSubmitting(old => !!old && !old)
            setRcn(oldData.preparatoryCourseStatus !== 'missing')
        }
        if (!!oldData.id && !oldData.graduationStep) {
            setSubmitting(old => !old && true)
        }
    }, [oldData])

    const createProfile = async profile => {
        let institutionIds = profile.institutionIds.map(({ value }) => value)
        let specialtyIds = profile.specialtyIds.map(({ value }) => value)
        try {
            const {
                data: { createProfile }
            } = await client.mutate({
                mutation: CREATE_PROFILE_MUTATION,
                variables: {
                    data: {
                        ...profile,
                        institutionIds,
                        specialtyIds,
                        preparatoryCourseName:
                            profile.preparatoryCourseStatus === 'missing'
                                ? null
                                : profile.preparatoryCourseName
                    }
                }
            })
            setMe(old => ({ ...old, ...createProfile }))
            snackbar({
                message: t('userProfile.mutations.create.success'),
                theme: 'success'
            })
        } catch {
            snackbar({
                message: t('userProfile.mutations.create.error'),
                theme: 'error'
            })
        }
        setSubmitting(false)
    }

    const updateProfile = async profile => {
        let institutionIds = profile.institutionIds.map(({ value }) => value)
        let specialtyIds = profile.specialtyIds.map(({ value }) => value)
        try {
            const {
                data: { updateProfile }
            } = await client.mutate({
                mutation: UPDATE_PROFILE_MUTATION,
                variables: {
                    data: {
                        ...profile,
                        institutionIds,
                        specialtyIds,
                        preparatoryCourseName:
                            profile.preparatoryCourseStatus === 'missing'
                                ? null
                                : profile.preparatoryCourseName
                    }
                }
            })
            setMe(old => ({ ...old, ...updateProfile }))
            snackbar({
                message: t('userProfile.mutations.update.success'),
                theme: 'success'
            })
        } catch {
            snackbar({
                message: t('userProfile.mutations.update.error'),
                theme: 'error'
            })
        }
        setSubmitting(false)
        !!closeModal && closeModal()
        if (!!oldData.id) {
            const {
                data: { updateCourseProgressAccess }
            } = await client.mutate({
                mutation: UPDATE_COURSE_ACCESSED,
                variables: {
                    data: {
                        accessed: true
                    }
                }
            })
            setActiveCourse({
                ...updateCourseProgressAccess
            })
        }
    }

    const handleSubmit = e => {
        e.preventDefault()
        setSubmitting(true)
        form.validateFields((err, values) => {
            if (!err) {
                if (oldData.id) {
                    updateProfile({ id: oldData.id, ...values })
                } else {
                    createProfile(values)
                }
            } else {
                setSubmitting(false)
            }
        })
    }

    return (
        <SANSpin spinning={submitting} flex>
            <SANForm form={form} onSubmit={handleSubmit}>
                <SANRow gutter={24}>
                    <SANCol>
                        <SANStyledFormItem
                            name='graduationStep'
                            label={t('userProfile.graduatedStep.label')}
                            initialValue={
                                !!oldData ? oldData.graduationStep : undefined
                            }
                            rules={[
                                {
                                    required: true,
                                    message: 'Este campo é obrigatório!'
                                }
                            ]}
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
                                !!oldData ? oldData.institutionIds : undefined
                            }
                            rules={[
                                {
                                    required: true,
                                    message: 'Este campo é obrigatório!'
                                }
                            ]}
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
                                !!oldData ? oldData.specialtyIds : undefined
                            }
                            rules={[
                                {
                                    required: true,
                                    message: 'Este campo é obrigatório!'
                                }
                            ]}
                            hasError={!!form.getFieldError('specialtyIds')}
                        >
                            <SANSelectFilter
                                placeholder={t('userProfile.placeholder')}
                                items={specialties}
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
                            initialValue={testExperiences[0]}
                            rules={[
                                {
                                    required: true,
                                    message: 'Este campo é obrigatório!'
                                }
                            ]}
                            valuePropName='checked'
                        >
                            <SANStyledRadioGroup
                                mt='16px'
                                defaultValue={testExperiences[0]}
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
                                !!oldData
                                    ? oldData.preparatoryCourseStatus
                                    : undefined
                            }
                            rcn={rcn}
                            rules={[
                                {
                                    required: true,
                                    message: 'Este campo é obrigatório!'
                                }
                            ]}
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
                {rcn && (
                    <SANRow gutter={24}>
                        <SANCol>
                            <SANStyledFormItem
                                name='preparatoryCourseName'
                                initialValue={
                                    !!oldData
                                        ? oldData.preparatoryCourseName
                                        : undefined
                                }
                                rules={[
                                    {
                                        required: true,
                                        message: 'Este campo é obrigatório!'
                                    }
                                ]}
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
                                        oldData.id
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

export default withSANForm<IFormProps>(RMForm)
