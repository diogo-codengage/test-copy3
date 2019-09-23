import React, { useEffect, useState } from 'react'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import { useApolloClient } from '@apollo/react-hooks'

import { SANProfile } from '@sanar/components'

import { useAuthContext } from 'Hooks/auth'
import { GET_STATES, IState } from 'Apollo/User/Queries/states'
import { EDIT_USER_MUTATION } from 'Apollo/User/Mutations/edit-user'

interface IStatesQuery {
    states: {
        data: IState[]
    }
}

const FLXMyData = ({ history }: RouteComponentProps) => {
    const client = useApolloClient()
    const { me } = useAuthContext()
    const [states, setStates] = useState<IState[]>([])

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

    const handleSubmit = async (values, { setSubmitting }) => {
        try {
            await client.mutate({
                mutation: EDIT_USER_MUTATION,
                variables: values
            })
        } catch {}
        setSubmitting(false)
    }

    return (
        <SANProfile
            onBack={() => history.goBack()}
            states={states}
            user={!!me && me}
            onSubmit={handleSubmit}
        />
    )
}

export default withRouter(FLXMyData)
