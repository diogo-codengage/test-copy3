import React, { useState, useEffect, useMemo } from 'react'

import { useTranslation } from 'react-i18next'
import { useApolloClient } from '@apollo/react-hooks'

import { withSANForm, useSnackbarContext } from '@sanar/components'

import { useAuthContext } from 'Hooks/auth'
import {
    CREATE_PROFILE_MUTATION,
    UPDATE_PROFILE_MUTATION
} from 'Apollo/User/Mutations/profile'
import { GET_SUPPLEMENTARY_SPECIALTIES } from 'Apollo/User/Queries/supplementary-specialties'
import { GET_INSTITUTIONS } from 'Apollo/PracticalArea/Queries/institutions'
import { GET_ACTIVE_COURSE } from 'Apollo/User/Queries/active-course'

import RMForm from './Form'

interface IOwner {
    label: string
    value: string
}
export interface IFormDataProps {
    id?: string
    graduationStep: string
    institutionIds: IOwner[]
    specialtyIds: IOwner[]
    testExperience: string
    preparatoryCourseStatus: string
    preparatoryCourseName?: string
    objective: string
}
interface IFormProps {
    form: any
}

const updateActiveCourseCache = store => {
    try {
        const data = store.readQuery({
            query: GET_ACTIVE_COURSE
        })

        data.activeCourse = {
            ...data.activeCourse,
            accessed: true
        }

        store.writeQuery({
            query: GET_ACTIVE_COURSE,
            data
        })
    } catch (err) {
        console.error(err.message)
    }
}

const RMComplementaryRegisterForm = ({ form, closeModal }) => {
    const client = useApolloClient()
    const { t } = useTranslation('resmed')
    const [rcn, setRcn] = useState('missing')
    const [submitting, setSubmitting] = useState(false)
    const [testValue, setTestValue] = useState('none')
    const [institutions, setInstitutions] = useState<IOwner[]>([])
    const [supplementarySpecialties, setSupplementarySpecialties] = useState<
        IOwner[]
    >([])
    const snackbar = useSnackbarContext()
    const { me, setMe, setActiveCourse } = useAuthContext()

    const makePayload = (profile: IFormDataProps) => ({
        ...profile,
        institutionIds: profile.institutionIds.length ? profile.institutionIds.map(({ value }) => value) : null,
        specialtyIds: profile.specialtyIds.length ? profile.specialtyIds.map(({ value }) => value) : null,
        preparatoryCourseName:
            profile.preparatoryCourseStatus === 'missing'
                ? null
                : profile.preparatoryCourseName
    })

    const createProfile = async profile => {
        try {
            const {
                data: { createProfile }
            } = await client.mutate({
                mutation: CREATE_PROFILE_MUTATION,
                variables: {
                    data: makePayload(profile)
                },
                update: updateActiveCourseCache
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
        try {
            const {
                data: { updateProfile }
            } = await client.mutate({
                mutation: UPDATE_PROFILE_MUTATION,
                variables: {
                    data: makePayload(profile)
                },
                update: updateActiveCourseCache
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
    }

    const handleSubmit = e => {
        e.preventDefault()
        setSubmitting(true)
        form.validateFields((err, values) => {
            if (!err) {
                if (!!me.profile && !!me.profile.id) {
                    updateProfile({ id: me.profile.id, ...values })
                } else {
                    createProfile(values)
                }
                setActiveCourse(old => ({ ...old, accessed: true }))
            } else {
                setSubmitting(false)
            }
        })
    }

    const fetchSpecialties = async () => {
        try {
            const {
                data: { supplementarySpecialties }
            } = await client.query({ query: GET_SUPPLEMENTARY_SPECIALTIES })

            setSupplementarySpecialties(supplementarySpecialties)
        } catch (err) {
            snackbar({
                message: t('userProfile.loadError.specialties'),
                theme: 'error'
            })
        }
    }

    const fetchInstitutions = async () => {
        try {
            const {
                data: { institutions }
            } = await client.query({ query: GET_INSTITUTIONS })

            setInstitutions(institutions)
        } catch (err) {
            snackbar({
                message: t('userProfile.loadError.institutions'),
                theme: 'error'
            })
        }
    }

    useEffect(() => {
        fetchSpecialties()
        fetchInstitutions()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const profile = useMemo(() => {
        if (!!me && !!me.profile) {
            setRcn(me.profile.preparatoryCourseStatus)
            return {
                ...me.profile,
                institutionIds: institutions.filter(({ value }) =>
                    me.profile.institutionIds && me.profile.institutionIds.find(itt => value === itt)
                ),
                specialtyIds: supplementarySpecialties.filter(({ value }) =>
                    me.profile.specialtyIds && me.profile.specialtyIds.find(sp => value === sp)
                )
            }
        }
    }, [me, institutions, supplementarySpecialties])

    return (
        <RMForm
            {...{
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
            }}
        />
    )
}

export default withSANForm<IFormProps>(RMComplementaryRegisterForm)
