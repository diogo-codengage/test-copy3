import React, { createContext, useContext, useEffect, useState } from 'react'

import { withRouter } from 'react-router-dom'
import { message } from 'antd'
import { useTranslation } from 'react-i18next'

import { getClassRoute } from 'Utils/getClassRoute'
import { formatPlaylist } from 'Utils/formatPlaylist'
import { useApolloContext } from 'Hooks/apollo'
import { useAuthContext } from 'Hooks/auth'
import { usePortalContext } from '../Context'
import { useLayoutContext } from '../Layout/Context'

import { GET_MODULE } from 'Apollo/Classroom/queries/module'
import { CREATE_BOOKMARK } from 'Apollo/Classroom/mutations/bookmark'
import { CREATE_PROGRESS } from 'Apollo/Classroom/mutations/video-progress'
import { GET_BOOKMARK } from 'Apollo/Classroom/queries/bookmark'

const Context = createContext()

export const useClassroomContext = () => useContext(Context)

const ClassroomProvider = ({ children, match: { params }, history }) => {
    const client = useApolloContext()
    const { t } = useTranslation('esanar')
    const {
        setCurrentResource,
        getResource,
        currentModule,
        currentResource,
        dispatch,
        fetchLastAccessed,
        setError
    } = usePortalContext()

    const {
        setMenuTab,
        setDarkMode,
        stopwatchRef,
        menuOpenOrClose,
        setPageContext
    } = useLayoutContext()
    const { getEnrollment, me } = useAuthContext()

    const { id: enrollmentId } = getEnrollment()

    const [bookmarked, setBookmark] = useState()

    const openMenu = () => {
        setMenuTab(9)
        menuOpenOrClose()
    }

    const handleBookmark = async ({ resourceId, resourceType }) => {
        try {
            !resourceId && setBookmark(oldBookmarked => !oldBookmarked)
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
        } catch {
            message.error(t('classroom.failHandleBookmark'))
        }
    }

    const handleProgress = ({ timeInSeconds, percentage, resourceId }) => {
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
        setDarkMode(true)
        return () => {
            setMenuTab(0)
            setDarkMode(false)
            setPageContext('general')
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        return fetchLastAccessed
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        if (currentResource) {
            const fetchData = async () => {
                try {
                    const {
                        data: { bookmark }
                    } = await client.query({
                        query: GET_BOOKMARK,
                        fetchPolicy: 'network-only',
                        variables: {
                            resourceId: getResource(currentResource).id
                        }
                    })

                    setBookmark(!!bookmark)
                } catch (err) {
                    console.error(err)
                }
            }
            fetchData()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentResource])

    useEffect(() => {
        if (currentModule && currentModule.id === params.moduleId) return

        const fetchData = async () => {
            dispatch({ type: 'loading' })
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

                dispatch({
                    type: 'success',
                    payload: module
                })

                const {
                    level_contents: { data: lessons }
                } = module

                if (!params.type && !params.resourceId) {
                    const resource = lessons[module.progress.done]
                    const type = getClassRoute(resource.resource_type)

                    setCurrentResource(lessons[module.progress.done])

                    history.push(
                        `/aluno/sala-aula/${module.id}/${type}/${
                            getResource(resource).id
                        }`
                    )
                } else {
                    const resource = lessons.find(
                        item => getResource(item).id === params.resourceId
                    )

                    setCurrentResource(resource)
                }
            } catch (error) {
                message.error(t('classroom.failLoadClassroom'))
                setError(error)
                dispatch({ type: 'loading', payload: error })
            }
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
        handleBookmark,
        bookmarked,
        handleProgress,
        openMenu,
        stopwatchRef
    }

    return <Context.Provider value={value}>{children}</Context.Provider>
}

export const SANClassroomProvider = withRouter(ClassroomProvider)

export const withClassroomProvider = Component => props => (
    <SANClassroomProvider>
        <Component {...props} />
    </SANClassroomProvider>
)
