import React, { useState } from 'react'

import { useTranslation } from 'react-i18next'

import { useSnackbarContext } from '@sanar/components'
import { useApolloClient } from '@apollo/react-hooks'
import { useAuthContext } from 'Hooks/auth'

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
    SANSelectOption
} from '@sanar/components'

import styled, { css } from 'styled-components'
import { theme, ifProp } from 'styled-tools'

import {
    CREATE_PROFILE_MUTATION,
    UPDATE_PROFILE_MUTATION
} from 'Apollo/User/Mutations/profile'

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
    id?: string
    graduationStep?: string
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
interface IListProps {
    label: string
    value: number
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
    institutions = [] as IListProps[]
}) => {
    const client = useApolloClient()
    const { t } = useTranslation('resmed')
    const [requireCurseName, setRequireCurseName] = useState(false)
    const [submitting, setSubmitting] = useState(false)
    const snackbar = useSnackbarContext()
    const { setMe } = useAuthContext()

    const createProfile = async profile => {
        let institutionIds = profile.institutionIds.map(({ value }) => value)
        let specialtyIds = profile.specialtyIds.map(({ value }) => value)
        // console.log('create', profile, institutionIds, specialtyIds)
        try {
            const {
                data: { createProfile }
            } = await client.mutate({
                mutation: CREATE_PROFILE_MUTATION,
                variables: {
                    data: {
                        ...profile,
                        institutionIds,
                        specialtyIds
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
        // console.log('update', profile)
        try {
            const {
                data: { updateProfile }
            } = await client.mutate({
                mutation: UPDATE_PROFILE_MUTATION,
                variables: {
                    data: {
                        ...profile,
                        institutionIds,
                        specialtyIds
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
    }

    const handleSubmit = e => {
        e.preventDefault()
        setSubmitting(true)
        form.validateFields((err, values) => {
            if (!err) {
                if (oldData.id) {
                    updateProfile(values)
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
                        <SANFormItem
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
                        </SANFormItem>
                    </SANCol>
                </SANRow>
                <SANRow gutter={24}>
                    <SANCol>
                        <SANFormItem
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
                        >
                            <SANSelectFilter
                                placeholder={t('userProfile.placeholder')}
                                items={institutions}
                                InputProps={{ size: 'large' }}
                                mt='md'
                            />
                        </SANFormItem>
                    </SANCol>
                </SANRow>
                <SANRow gutter={24}>
                    <SANCol>
                        {/* {specialties[0] && ( */}
                        <SANFormItem
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
                        >
                            {/* {console.log('in render', specialties)} */}

                            <SANSelectFilter
                                placeholder={t('userProfile.placeholder')}
                                items={specialties}
                                // items={[
                                //     specialties.map(({ name, id }) =>
                                //         Object({ label: name, value: id })
                                //     )
                                // ]}
                                InputProps={{ size: 'large' }}
                                mt='md'
                            />
                        </SANFormItem>
                        {/* )} */}
                    </SANCol>
                </SANRow>
                <SANRow gutter={24}>
                    <SANCol>
                        <SANFormItem
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
                                        second={item === testExperiences[1]}
                                        value={item}
                                    >
                                        {t(
                                            `userProfile.testExperiences.${item}`
                                        )}
                                    </SANStyledRadio>
                                ))}
                            </SANStyledRadioGroup>
                        </SANFormItem>
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
                            requireCurseName={requireCurseName}
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
                                    setRequireCurseName(
                                        item !== preparatoryCourseStatus[0]
                                    )
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
                {requireCurseName && (
                    <SANRow gutter={24}>
                        <SANCol>
                            <SANFormItem
                                name='preparatoryCourseName'
                                initialValue={
                                    !!oldData
                                        ? oldData.preparatoryCourseName
                                        : undefined
                                }
                                rules={[{ required: true }]}
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
                                type='submit'
                            >
                                {t(
                                    `userProfile.${
                                        oldData.id
                                            ? 'modalSubmit'
                                            : 'pageSubmit'
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
