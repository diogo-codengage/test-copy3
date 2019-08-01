import React, { createContext, useState, useContext, useEffect } from 'react'
import { Query } from 'react-apollo'
import { GET_BOOKMARKS } from 'Apollo/Bookmark/queries/bookmarks'
import { useAuthContext } from 'Hooks/auth'

export const SANBookmarksContext = createContext()

export const useBookmarksContext = () => useContext(SANBookmarksContext)

export const SANBookmarksProvider = ({ children }) => {
    const { getEnrollment } = useAuthContext()
    const { id: enrollmentId } = getEnrollment()
    const [orientation, setOrientation] = useState('grid')
    const [filter, setFilter] = useState(null)
    const [page, setPage] = useState(0)

    useEffect(() => {
        setPage(0)
    }, [filter])

    const value = {
        orientation,
        setOrientation,
        filter,
        setFilter,
        page,
        setPage
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
            {({ loading, error, data: { bookmarks }, refetch }) => {
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
