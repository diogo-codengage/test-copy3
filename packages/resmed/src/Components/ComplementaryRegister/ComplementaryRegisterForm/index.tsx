import React, { useMemo } from 'react'

import { useTranslation } from 'react-i18next'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { prop, omit } from 'ramda'
import { format } from 'date-fns'
import moment from 'moment'

import { withSANForm, useSnackbarContext } from '@sanar/components'

import { useAuthContext } from 'Hooks/auth'

import { GET_ACTIVE_COURSE } from 'Apollo/User/Queries/active-course'
import {
    GET_SUPPLEMENTARY_ITEMS,
    ISupplementaryItemsQuery
} from 'Apollo/User/Queries/supplementary-items'
import {
    SUPPLEMENTARY_DATA,
    ISuplemmentaryMutation,
    ISuplemmentaryVariables,
    ISuplemmentaryOptions
} from 'Apollo/User/Mutations/supplementary-data'

import RMForm from './Form'

interface IFormProps {
    form: any
}

interface IFormValues extends ISuplemmentaryOptions {
    preparatoryCourseStatus: 'yes' | 'no'
}

const toLowerCase = v => ({
    ...v,
    label: v.label.toLowerCase()
})

const RMComplementaryRegisterForm = ({ form, closeModal }) => {
    const { t } = useTranslation('resmed')

    const [mutation, { loading: loadingMutation }] = useMutation<
        ISuplemmentaryMutation,
        ISuplemmentaryVariables
    >(SUPPLEMENTARY_DATA, {
        onCompleted(response) {
            setMe(old => ({ ...old, ...response }))
            snackbar({
                message: t('userProfile.mutations.success'),
                theme: 'success'
            })
            !!closeModal && closeModal()
        },
        onError() {
            snackbar({
                message: t('userProfile.mutations.error'),
                theme: 'success'
            })
        },
        refetchQueries: [{ query: GET_ACTIVE_COURSE }]
    })

    const { loading: loadingQuery, data, error } = useQuery<
        ISupplementaryItemsQuery
    >(GET_SUPPLEMENTARY_ITEMS)

    const snackbar = useSnackbarContext()
    const { me, setMe } = useAuthContext()

    const makePayload = (profile: IFormValues): IFormValues => {
        const data = {
            ...profile,
            medInstitutionIds: profile.medInstitutionIds.map(prop('value')),
            medProfissionalSpecialtyIds: profile.medProfissionalSpecialtyIds.map(
                prop('value')
            ),
            ingressYear: format(new Date(profile.ingressYear)),
            ingressSemester: String(profile.ingressSemester),
            ...(profile.preparatoryCourseStatus === 'no' && {
                previousResidencyCourseId: null
            })
        }
        return omit(['preparatoryCourseStatus'])(data)
    }

    const handleSubmit = e => {
        e.preventDefault()
        form.validateFields((err, values) => {
            if (!err) {
                mutation({ variables: { data: makePayload(values) } })
            }
        })
    }

    if (!loadingQuery && error) {
        snackbar({
            message: t('userProfile.loadError'),
            theme: 'error'
        })
    }

    const profile = useMemo(() => {
        if (!!me) {
            return {
                ...(!!me.userMedUniversity && {
                    medUniversityId: me.userMedUniversity.medUniversity.id,
                    ingressYear: moment(
                        me.userMedUniversity.ingressYear,
                        'YYYY-MM-DD'
                    ),
                    ingressSemester: me.userMedUniversity.ingressSemester
                }),
                ...(!!me.medProfile && {
                    hasPreviousResidencyExam:
                        me.medProfile.hasPreviousResidencyExam,
                    previousResidencyCourseId: !!me.medProfile
                        .previousResidencyCourse
                        ? me.medProfile.previousResidencyCourse.id
                        : undefined,
                    examIntentionCategoryId:
                        me.medProfile.examIntentionCategoryId,
                    preparatoryCourseStatus: !!me.medProfile
                        .previousResidencyCourse
                        ? 'yes'
                        : 'no'
                }),
                medProfissionalSpecialtyIds: (
                    me.userMedSpecialtyIntentions || []
                ).map(e => ({
                    value: e.medProfessionalSpecialty.id,
                    label: e.medProfessionalSpecialty.name
                })),
                medInstitutionIds: (me.userMedInstitutions || []).map(e => ({
                    value: e.medInstitution.id,
                    label: e.medInstitution.name
                }))
            }
        }
    }, [me])

    return (
        <RMForm
            form={form}
            submitting={loadingMutation || loadingQuery}
            handleSubmit={handleSubmit}
            profile={profile}
            {...(!!data && {
                institutions: (data.institutions || []).map(toLowerCase),
                medUniversities: (data.medUniversities || []).map(toLowerCase),
                questionCategories: (data.questionCategories || []).map(
                    toLowerCase
                ),
                medResidencyCourses: (data.medResidencyCourses || []).map(
                    toLowerCase
                ),
                medProfessionalSpecialties: (
                    data.medProfessionalSpecialties || []
                ).map(toLowerCase)
            })}
        />
    )
}

export default withSANForm<IFormProps>(RMComplementaryRegisterForm)
