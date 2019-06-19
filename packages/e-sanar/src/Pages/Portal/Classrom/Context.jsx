import React, {
    createContext,
    useContext,
    useState,
    useEffect,
    useReducer
} from 'react'

import * as R from 'ramda'
import { withRouter } from 'react-router-dom'

import { useApolloContext } from 'Hooks/apollo'
import { GET_LEVEL_CONTENT } from 'Apollo/Classrom/queries/level-content'

const Context = createContext()

export const useClassromContext = () => useContext(Context)

const initialState = { loading: true, success: false, error: false }

function reducer(state, action) {
    switch (action.type) {
        case 'loading':
            return { ...state, loading: true }
        case 'success':
            return { ...state, loading: false, level: action.payload }
        case 'error':
            return { ...state, loading: false, error: action.payload }
        default:
            throw new Error()
    }
}

const getSubRoute = type => {
    switch (type) {
        case 'Video':
            return 'video'
        case 'Document':
            return 'documento'
        case 'Quiz':
            return 'simulado'
        default:
            throw new Error()
    }
}

const ClassromProvider = ({ children, match: { params }, history }) => {
    const client = useApolloContext()
    const [current, setCurrent] = useState()
    const [state, dispatch] = useReducer(reducer, initialState)

    useEffect(() => {
        const fetchData = async () => {
            dispatch({ type: 'loading' })
            if (!params.id) return dispatch({ type: 'error' })
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

                const ordered = R.sortBy(R.prop('index'), data)
                const anchor = ordered[0]
                setCurrent(anchor)
                dispatch({ type: 'success', payload: ordered })
                history.push(
                    `/aluno/sala-aula/${params.id}/${getSubRoute(
                        anchor.resource_type
                    )}/${anchor[anchor.resource_type.toLowerCase()].id}`
                )
            } catch (err) {
                dispatch({ type: 'error' })
            }
        }
        fetchData()
    }, [params.id, client, history])

    const value = {
        state,
        current
    }

    return <Context.Provider value={value}>{children}</Context.Provider>
}

export const SANClassromProvider = withRouter(ClassromProvider)

export const withClassromProvider = Component => props => (
    <SANClassromProvider>
        <Component {...props} />
    </SANClassromProvider>
)
