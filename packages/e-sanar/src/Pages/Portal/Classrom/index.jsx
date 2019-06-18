import React, { useEffect, useState } from 'react'

import { Switch, Route } from 'react-router-dom'
import * as R from 'ramda'

import ESSpin from 'sanar-ui/dist/Components/Atoms/Spin'

import { useApolloContext } from 'Hooks/apollo'
import { GET_LEVEL_CONTENT } from 'Apollo/Classrom/queries/level-content'
import { withClassromProvider, useClassromContext } from './Context'

const SANClassrom = ({ match: { url, params } }) => {
    const client = useApolloContext()
    const { setPlaylist } = useClassromContext()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            setError(false)
            try {
                const {
                    data: {
                        levelContent: { data }
                    }
                } = await client.query({
                    query: GET_LEVEL_CONTENT,
                    fetchPolicy: 'network-only',
                    variables: {
                        levelId: params.id
                    }
                })

                setPlaylist(R.sortBy(R.prop('index'), data))
            } catch (err) {
                setError(true)
            }
            setLoading(false)
        }
        fetchData()
    }, [params.id, client, setPlaylist])

    if (loading) return <ESSpin />

    if (error) return `Error! ${error}`

    return (
        <div className='classrom'>
            <Switch>
                <Route
                    path={`${url}/video/:id`}
                    render={() => <div>SANClassromVideo</div>}
                    // component={SANClassromVideo}
                />
                <Route
                    path={`${url}/documento/:id`}
                    render={() => <div>SANClassromDocument</div>}
                    // component={SANClassromDocument}
                />
                <Route
                    path={`${url}/simulado/:id`}
                    render={() => <div>SANClassromDocument</div>}
                    // component={SANClassromMock}
                />
            </Switch>
        </div>
    )
}

export default withClassromProvider(SANClassrom)
