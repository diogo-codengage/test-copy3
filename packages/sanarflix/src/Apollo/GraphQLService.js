import React from 'react'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from '@apollo/react-hooks'

const client = new ApolloClient({
    uri: process.env.REACT_APP_URL_API,
    request: async operation =>
        operation.setContext({
            headers: {
                Authorization: 'sanarflix-token'
            }
        })
})

const FLXGraphQLProvider = props => (
    <ApolloProvider client={client} {...props} />
)

export default FLXGraphQLProvider
