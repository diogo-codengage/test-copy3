import React, { createContext, useContext, useEffect, useReducer } from 'react'

import * as R from 'ramda'
import { withRouter } from 'react-router-dom'

import { useApolloContext } from 'Hooks/apollo'
import { useAuthContext } from 'Hooks/auth'
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

const ClassroomProvider = ({ children, match: { params }, history }) => {
    const client = useApolloContext()
    const {
        setCurrentModule,
        setCurrentResource,
        getResource,
        setResourcesLoading,
        menuIndex,
        setIndexMenu,
        currentModule,
        setDarkMode
    } = usePortalContext()
    const [state] = useReducer(reducer, initialState)
    const { getEnrollment } = useAuthContext()

    const { id: enrollmentId } = getEnrollment(0)

    useEffect(() => {
        setIndexMenu(9)
        setDarkMode(true)
        return () => {
            setIndexMenu(0)
            setDarkMode(false)
        }
    }, [menuIndex, setIndexMenu, setDarkMode])

    useEffect(() => {
        if (currentModule && currentModule.id === params.moduleId) return

        setResourcesLoading(true)
        const fetchData = async () => {
            try {
                const {
                    data: { module: requestedModule }
                } = await client.query({
                    query: GET_MODULE,
                    fetchPolicy: 'network-only',
                    variables: {
                        enrollmentId,
                        id: params.moduleId
                    }
                })

                const ordered = R.sortBy(
                    R.prop('index'),
                    requestedModule.level_contents.data
                )

                const formattedLevels = ordered
                    .map((level, index) => {
                        return {
                            ...level,
                            ...(ordered[index + 1] &&
                                ordered[index + 1]['resource_type'] ===
                                    'Quiz' && {
                                    quiz: ordered[index + 1].quiz
                                })
                        }
                    })
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
                    .map((level, index) => {
                        //TODO: Is this the best way?
                        return {
                            ...level,
                            index
                        }
                    })

                const module = {
                    ...requestedModule,
                    level_contents: {
                        data: formattedLevels
                    }
                }

                setCurrentModule(module)

                const {
                    level_contents: { data: lessons }
                } = module

                if (!params.type && !params.resourceId) {
                    const resource = lessons[module.progress.done]

                    history.push(
                        `/aluno/sala-aula/${
                            module.id
                        }/${resource.resource_type.toLowerCase()}/${
                            getResource(resource).id
                        }`
                    )

                    setCurrentResource(lessons[module.progress.done])
                } else {
                    const resource = lessons.find(item => {
                        return getResource(item).id === params.resourceId
                    })

                    setCurrentResource(resource)
                }

                setResourcesLoading(false)
            } catch (err) {
                console.log(err)
            }
        }
        fetchData()
    }, [
        params.moduleId,
        client,
        history,
        currentModule,
        enrollmentId,
        getResource,
        params.resourceId,
        params.type,
        setCurrentModule,
        setCurrentResource,
        setResourcesLoading
    ])

    const value = {
        state
    }

    return <Context.Provider value={value}>{children}</Context.Provider>
}

export const SANClassroomProvider = withRouter(ClassroomProvider)

export const withClassroomProvider = Component => props => (
    <SANClassroomProvider>
        <Component {...props} />
    </SANClassroomProvider>
)
