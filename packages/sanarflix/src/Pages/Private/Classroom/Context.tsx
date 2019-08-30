import React, { useContext, createContext, useEffect } from 'react'

import { zipObj } from 'ramda'
import { useApolloClient } from '@apollo/react-hooks'

import { useLayoutContext } from 'Pages/Layout/Context'

import { CREATE_BOOKMARK } from 'Apollo/Classroom/Mutations/bookmark'

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
    const { setDarkMode, setMenuTab, setMenuContext } = useLayoutContext()

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

    useEffect(() => {
        setDarkMode(true)
        setMenuContext('classroom')
        return () => {
            setMenuTab(0)
            setDarkMode(false)
            setMenuContext('general')
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const value: IFLXClassroomProviderValue = {
        handleBookmark
    }

    return <Context.Provider value={value}>{children}</Context.Provider>
}

export default FLXClassroomProvider
