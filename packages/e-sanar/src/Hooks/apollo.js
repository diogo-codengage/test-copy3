import React, { createContext, useContext } from 'react'
import { withApollo } from 'react-apollo'

const Context = createContext({})

export const useApolloContext = () => {
    const { client } = useContext(Context)
    return client
}

export const SANApolloProvider = withApollo(({ children, ...props }) => (
    <Context.Provider value={props}>{children}</Context.Provider>
))
