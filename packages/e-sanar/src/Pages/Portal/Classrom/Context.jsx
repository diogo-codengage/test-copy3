import React, {
    createContext,
    useContext,
    useEffect,
    useReducer,
    useState
} from 'react'

import { withRouter } from 'react-router-dom'

import { formatPlaylist } from 'Utils/formatPlaylist'
import { useApolloContext } from 'Hooks/apollo'
import { useAuthContext } from 'Hooks/auth'
import { usePortalContext } from '../Context'
import { GET_MODULE } from 'Apollo/Classroom/queries/module'
import { CREATE_BOOKMARK } from 'Apollo/Classroom/mutations/bookmark'
import { CREATE_PROGRESS } from 'Apollo/Classroom/mutations/video-progress'
import { useLayoutContext } from '../Layout/Context'

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
        currentModule,
        currentResource
    } = usePortalContext()

    const { menuIndex, setIndexMenu, setDarkMode } = useLayoutContext()
    const [state] = useReducer(reducer, initialState)
    const { getEnrollment, me } = useAuthContext()

    const { id: enrollmentId } = getEnrollment()

    const [bookmarked, setBookmarked] = useState()

    const handleBookmark = async ({ resourceId, resourceType }) => {
        await client.mutate({
            mutation: CREATE_BOOKMARK,
            variables: {
                resourceId: resourceId
                    ? resourceId
                    : getResource(currentResource).id,
                resourceType: resourceType
                    ? resourceType
                    : currentResource.resource_type,
                userId: me.id
            }
        })
        !resourceId && setBookmarked(oldBookmarked => !oldBookmarked)
    }

    const handleProgress = ({
        timeInSeconds,
        percentage,
        resourceId,
        resourceType
    }) => {
        if (currentResource) {
            client.mutate({
                mutation: CREATE_PROGRESS,
                variables: {
                    ...(timeInSeconds && {
                        timeInSeconds
                    }),
                    percentage,
                    enrollmentId,
                    resourceId,
                    resourceType: currentResource.resource_type
                }
            })
        }
    }

    useEffect(() => {
        currentResource &&
            setBookmarked(getResource(currentResource).bookmarked)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentResource])

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
                    variables: {
                        enrollmentId,
                        id: params.moduleId
                    }
                })

                const formattedLevels = formatPlaylist(
                    requestedModule.level_contents.data
                )

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
                    const resource = lessons.find(
                        item => getResource(item).id === params.resourceId
                    )

                    setCurrentResource(resource)
                }
            } catch (err) {
                console.log(err)
            }
            setResourcesLoading(false)
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
        state,
        handleBookmark,
        bookmarked,
        handleProgress
    }

    return <Context.Provider value={value}>{children}</Context.Provider>
}

export const SANClassroomProvider = withRouter(ClassroomProvider)

export const withClassroomProvider = Component => props => (
    <SANClassroomProvider>
        <Component {...props} />
    </SANClassroomProvider>
)
