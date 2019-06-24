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
import { GET_LEVEL_CONTENT } from 'Apollo/Classroom/queries/level-content'
import { usePortalContext } from '../Context'
import { GET_MODULE } from 'Apollo/Classroom/queries/module'

const Context = createContext()

export const useClassroomContext = () => useContext(Context)

const initialState = { loading: true, success: false, error: false }

function reducer(state, action) {
    switch (action.type) {
        case 'loading':
            return { ...state, loading: true }
        case 'success':
            return { ...state, loading: false, level: action.payload }
        case 'error':
            return { ...state, loading: false, error: action.payload || true }
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

const ClassroomProvider = ({ children, match: { params }, history }) => {
    const client = useApolloContext()
    const {
        setPlaylist,
        setCurrentResourceIndex,
        setCurrentModule
    } = usePortalContext()

    const [current, setCurrent] = useState({})
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

                const {
                    data: { module }
                } = await client.query({
                    query: GET_MODULE,
                    fetchPolicy: 'network-only',
                    variables: {
                        enrollmentId: '5d09125504bf68004bec3406',
                        id: '5d0ad69c7f018f00114ac688'
                    }
                })

                setCurrentModule(module)

                const { level_contents } = module
                const ordered = R.sortBy(R.prop('index'), level_contents.data)

                console.log({
                    progress: module.progress,
                    levelContent: level_contents.data
                })

                setCurrent(ordered[module.progress.done])

                const map = ordered
                    .map((level, index) => ({
                        ...level,
                        ...(ordered[index + 1] &&
                            ordered[index + 1]['resource_type'] === 'Quiz' && {
                                quiz: ordered[index + 1].quiz
                            })
                    }))
                    .filter((level, index) => {
                        if (
                            level['resource_type'] === 'Quiz' &&
                            ordered[index - 1] &&
                            ordered[index - 1]['resource_type'] === 'Video' &&
                            index < ordered.length
                        ) {
                            return null
                        }
                        return level
                    })

                setCurrent(map[map.length - 1])
                const type = map[map.length - 1].resource_type

                dispatch({ type: 'success', payload: map })
                history.push(
                    `/aluno/sala-aula/${params.id}/${getSubRoute(type)}/${
                        map[map.length - 1][type.toLowerCase()].id
                    }/`
                )
            } catch (err) {
                dispatch({ type: 'error' })
            }
        }
        fetchData()
    }, [params.id, client, history, setPlaylist, setCurrentResourceIndex])

    const value = {
        state,
        current
    }

    return <Context.Provider value={value}>{children}</Context.Provider>
}

export const SANClassroomProvider = withRouter(ClassroomProvider)

export const withClassroomProvider = Component => props => (
    <SANClassroomProvider>
        <Component {...props} />
    </SANClassroomProvider>
)
