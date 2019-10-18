import React, { useContext, createContext, useEffect } from 'react'

import { zipObj } from 'ramda'
import { useApolloClient } from '@apollo/react-hooks'

import { useLayoutContext } from 'Pages/Layout/Context'

import { CREATE_BOOKMARK } from 'Apollo/Classroom/Mutations/bookmark'
import { CREATE_PROGRESS } from 'Apollo/Classroom/Mutations/create-progress'

interface IDataProgress {
    timeInSeconds?: number | string
    percentage: number
    courseId: string
    resource: {
        id: string
        type?:
            | 'Book'
            | 'Course'
            | 'Content'
            | 'Question'
            | 'Video'
            | 'Document'
            | 'Download'
            | 'Quiz'
    }
}

interface IFLXClassroomProviderValue {
    handleBookmark: (resource: {
        resourceId: string
        resourceType:
            | 'Book'
            | 'Course'
            | 'Content'
            | 'Question'
            | 'Video'
            | 'Document'
            | 'Download'
        bookmark: boolean
    }) => void
    handleProgress: (data: IDataProgress) => void
}

const Context = createContext<IFLXClassroomProviderValue>({} as any)
export const useClassroomContext = () => useContext(Context)

const resourceTypes = [
    'Book',
    'Course',
    'Content',
    'Question',
    'Video',
    'Document',
    'Download'
]

const makeOptimisticResponse = ({ resourceId, resourceType, bookmark }) => {
    const others = resourceTypes.filter(type => type !== resourceType)
    const othersObject = zipObj(
        others.map(e => e.toLocaleLowerCase()),
        new Array(others.length).fill(null)
    )

    return {
        __typename: 'Mutation',
        createBookmarks: {
            __typename: 'BookmarksPayload',
            ...othersObject,
            [resourceType.toLowerCase()]: {
                __typename: resourceType,
                id: resourceId,
                bookmarked: !bookmark
            }
        }
    }
}

const FLXClassroomProvider: React.FC = ({ children }) => {
    const client = useApolloClient()
    const { setMenuTab, setContext, loadLastAcessed } = useLayoutContext()

    const handleBookmark = async ({ resourceId, resourceType, bookmark }) => {
        try {
            await client.mutate({
                mutation: CREATE_BOOKMARK,
                variables: {
                    resourceId,
                    resourceType
                },
                optimisticResponse: makeOptimisticResponse({
                    resourceId,
                    resourceType,
                    bookmark
                })
            })
        } catch {}
    }

    const handleProgress = async (data: IDataProgress) => {
        await client.mutate({
            mutation: CREATE_PROGRESS,
            variables: {
                input: {
                    ...(data.timeInSeconds && {
                        time_in_seconds: parseInt(data.timeInSeconds.toString())
                    }),
                    resource_id: data.resource.id,
                    resource_type: data.resource.type,
                    course_id: data.courseId,
                    percentage: data.percentage
                }
            }
        })
    }

    useEffect(() => {
        return loadLastAcessed
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        setMenuTab(1)
        setContext('classroom')
        return () => {
            setMenuTab(0)
            setContext('general')
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const value: IFLXClassroomProviderValue = {
        handleBookmark,
        handleProgress
    }

    return <Context.Provider value={value}>{children}</Context.Provider>
}

export default FLXClassroomProvider
