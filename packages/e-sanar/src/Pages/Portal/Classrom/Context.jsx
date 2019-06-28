import React, {
    createContext,
    useContext,
    useEffect,
    useReducer,
    useState
} from 'react'

import { withRouter } from 'react-router-dom'
import { message } from 'antd'
import { useTranslation } from 'react-i18next'

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
    const { t } = useTranslation('esanar')
    const {
        setCurrentModule,
        setCurrentResource,
        getResource,
        setResourcesLoading,
        currentModule,
        currentResource
    } = usePortalContext()

    const { setMenuTab, setDarkMode, setOpenMenu } = useLayoutContext()
    const [state] = useReducer(reducer, initialState)
    const { getEnrollment, me } = useAuthContext()

    const { id: enrollmentId } = getEnrollment()

    const [bookmarked, setBookmarked] = useState()

    const openMenu = () => {
        setMenuTab(9)
        setOpenMenu(oldOpenMenu => !oldOpenMenu)
    }

    const handleBookmark = async ({ resourceId, resourceType }) => {
        try {
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
        } catch {
            message.error(t('classroom.failHandleBookmark'))
        }
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
        setDarkMode(true)

        return () => {
            setDarkMode(false)
        }
    }, [setDarkMode, setMenuTab])

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
                console.error(err)
                message.error(t('classroom.failLoadClassroom'))
            }
            setResourcesLoading(false)
        }
        fetchData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        currentModule,
        enrollmentId,
        params.moduleId,
        params.resourceId,
        params.type
    ])

    const value = {
        state,
        handleBookmark,
        bookmarked,
        handleProgress,
        openMenu
    }

    return <Context.Provider value={value}>{children}</Context.Provider>
}

export const SANClassroomProvider = withRouter(ClassroomProvider)

export const withClassroomProvider = Component => props => (
    <SANClassroomProvider>
        <Component {...props} />
    </SANClassroomProvider>
)
