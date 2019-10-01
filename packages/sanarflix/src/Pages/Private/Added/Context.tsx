import React, { createContext, useContext, useState } from 'react'
import { useQuery } from '@apollo/react-hooks'
import {
    GET_ADDED,
    ILastAddedContents,
    ILastAddedContentsPayload
} from 'Apollo/Added/Queries/added'
import { IType } from 'Apollo/Added/Queries/content-types'
import { ApolloError } from 'apollo-boost'

interface IContext {
    added: ILastAddedContents[]
    addedCount: number
    fetchMore?: any
    loading: boolean
    filter: IType | null
    setFilter: React.ComponentState
    error?: ApolloError
}

export const FLXAddedContext = createContext<IContext>({
    added: [{ title: '', thumbnail: '' }],
    loading: false,
    addedCount: 0,
    filter: null,
    setFilter: console.log
})

export const useAddedContext = () => useContext(FLXAddedContext)

export const FLXAddedProvider: React.FC = ({ children }) => {
    const [filter, setFilter] = useState<IType | null>(null)

    const { loading, fetchMore, data, error } = useQuery<
        ILastAddedContentsPayload,
        any
    >(GET_ADDED, {
        variables: { limit: 20, type: filter }
    })

    const value = {
        added:
            (data && data.lastAddedContents && data.lastAddedContents.data) ||
            [],
        addedCount:
            (data && data.lastAddedContents && data.lastAddedContents.count) ||
            0,
        error,
        loading,
        fetchMore,
        setFilter,
        filter
    }

    return (
        <FLXAddedContext.Provider value={value}>
            {children}
        </FLXAddedContext.Provider>
    )
}
