import React, { useEffect, useState } from 'react'

import { useTranslation } from 'react-i18next'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import { useApolloClient } from '@apollo/react-hooks'

import { SANProfile, useSnackbarContext } from '@sanar/components'

import { useAuthContext } from 'Hooks/auth'
import { GET_STATES, IState } from 'Apollo/User/Queries/states'
import { EDIT_USER_MUTATION } from 'Apollo/User/Mutations/edit-user'

import { events } from 'Config/Segment'
import {
    GET_MED_UNIVERSITIES,
    IMedUniversity,
    IMedUniversityQuery
} from 'Apollo/Exams/Queries/medUniversities'

interface IStatesQuery {
    states: {
        data: IState[]
    }
}

const FLXMyData = ({ history }: RouteComponentProps) => {
    const client = useApolloClient()
    const { t } = useTranslation('sanarflix')
    const snackbar = useSnackbarContext()
    const { me, setMe } = useAuthContext()
    const [states, setStates] = useState<IState[]>([])
    const [universities, setUniversities] = useState<IMedUniversity[]>([])

    useEffect(() => {
        const fetchStates = async () => {
            try {
                const {
                    data: { states }
                } = await client.query<IStatesQuery>({ query: GET_STATES })
                setStates(states.data)
            } catch {}
        }
        fetchStates()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        const fetchMedUniversities = async () => {
            try {
                const {
                    data: { medUniversities }
                } = await client.query<IMedUniversityQuery>({
                    query: GET_MED_UNIVERSITIES
                })
                setUniversities(
                    medUniversities.data.map(v => ({
                        ...v,
                        name: v.name.toLowerCase()
                    }))
                )
            } catch {
            }
        }
        fetchMedUniversities()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleSubmit = async (values, { setSubmitting }) => {
        try {
            const {
                data: { editUser }
            } = await client.mutate<any>({
                mutation: EDIT_USER_MUTATION,
                variables: values
            })
            setMe(old => ({ ...old, ...editUser }))
            snackbar({
                message: t('account.myData.success'),
                theme: 'success'
            })
        } catch {
            snackbar({
                message: t('account.myData.error'),
                theme: 'error'
            })
        }
        setSubmitting(false)
    }

    useEffect(() => {
        window.analytics.page(
            events['Page Viewed'].event,
            events['Page Viewed'].data
        )
    }, [])

    return (
        <SANProfile
            onBack={() => history.goBack()}
            states={states}
            universities={universities}
            user={!!me && me}
            onSubmit={handleSubmit}
        />
    )
}

export default withRouter(FLXMyData)
