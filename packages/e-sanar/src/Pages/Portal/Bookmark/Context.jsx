import React, { createContext, useState, useContext, useEffect } from 'react'
import { Query } from 'react-apollo'
import { GET_BOOKMARKS } from 'Apollo/Bookmark/queries/bookmarks'
import { CHANGE_BOOKMARK } from 'Apollo/Bookmark/mutations/bookmark'
import { useAuthContext } from 'Hooks/auth'
import { useApolloContext } from 'Hooks/apollo'

export const SANBookmarksContext = createContext()

export const useBookmarksContext = () => useContext(SANBookmarksContext)

export const SANBookmarksProvider = ({ children }) => {
    const client = useApolloContext()
    const {
        me: { userId }
    } = useAuthContext()
    const { getEnrollment } = useAuthContext()
    const { id: enrollmentId } = getEnrollment()
    const [orientation, setOrientation] = useState('grid')
    const [filter, setFilter] = useState(null)
    const [page, setPage] = useState(0)

    useEffect(() => {
        setPage(0)
    }, [filter])

    const removeBookmark = async (resourceId, resourceType) => {
        await client.mutate({
            mutation: CHANGE_BOOKMARK,
            variables: {
                resourceId,
                resourceType,
                userId
            },
            update: cache => {
                const data = cache.readQuery({
                    query: GET_BOOKMARKS
                })

                data.bookmarks.data = data.bookmarks.data.filter(book => {
                    return book.resource_id !== resourceId
                })
                data.bookmarks.count--

                cache.writeQuery({
                    query: GET_BOOKMARKS,
                    data
                })
            }
        })
    }

    const value = {
        orientation,
        setOrientation,
        filter,
        setFilter,
        page,
        setPage,
        removeBookmark
    }

    return (
        <Query
            query={GET_BOOKMARKS}
            fetchPolicy='cache-and-network'
            variables={{
                enrollmentId,
                resourceType: filter || null,
                limit: 12,
                skip: page
            }}
        >
            {({ loading, error, data: { bookmarks } }) => {
                return (
                    <SANBookmarksContext.Provider
                        value={{
                            ...value,
                            ...(bookmarks && {
                                bookmarks: bookmarks.data,
                                total: bookmarks.count
                            }),
                            loading
                        }}
                    >
                        {children}
                    </SANBookmarksContext.Provider>
                )
            }}
        </Query>
    )
}
