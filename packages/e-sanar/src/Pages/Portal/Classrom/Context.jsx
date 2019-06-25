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
import { useAuthContext } from 'Hooks/auth'
import { GET_LEVEL_CONTENT } from 'Apollo/Classroom/queries/level-content'
import { getClassRoute } from 'Utils/getClassRoute'
// import { usePortalContext } from 'Pages/Portal/Context'
// import { usePortalContext } from '../Context'
// import { GET_MODULE } from 'Apollo/Classroom/queries/module'

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

const ClassroomProvider = ({ children, match: { params }, history }) => {
    const client = useApolloContext()
    const {
        me: { id: userId }
    } = useAuthContext()
    // const {
    //     setPlaylist,
    //     setCurrentResourceIndex,
    //     setCurrentModule
    // } = usePortalContext()

    const [current, setCurrent] = useState({})
    const [state, dispatch] = useReducer(reducer, initialState)

    useEffect(() => {
        const fetchData = async () => {
            dispatch({ type: 'loading' })
            if (!params.id) return dispatch({ type: 'error' })
            try {
                const {
                    data: { levelContent }
                } = await client.query({
                    query: GET_LEVEL_CONTENT,
                    fetchPolicy: 'network-only',
                    variables: {
                        levelId: params.id,
                        userId
                    }
                })

                // const {
                //     data: { module }
                // } = await client.query({
                //     query: GET_MODULE,
                //     fetchPolicy: 'network-only',
                //     variables: {
                //         enrollmentId: '5d09125504bf68004bec3406',
                //         id: '5d0ad69c7f018f00114ac688'
                //     }
                // })

                // setCurrentModule(module)

                const ordered = R.sortBy(R.prop('index'), levelContent.data)

                console.log({
                    progress: module.progress,
                    levelContent: levelContent.data
                })

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

                setCurrent(map[1])
                const type = map[1].resource_type

                dispatch({ type: 'success', payload: map })
                history.push(
                    `/aluno/sala-aula/${params.id}/${getClassRoute(type)}/${
                        map[1][type.toLowerCase()].id
                    }/`
                )
            } catch (err) {
                dispatch({ type: 'error', payload: err })
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

export const SANClassroomProvider = withRouter(ClassroomProvider)

export const withClassroomProvider = Component => props => (
    <SANClassroomProvider>
        <Component {...props} />
    </SANClassroomProvider>
)
