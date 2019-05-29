import React from 'react'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'

const client = new ApolloClient({
    uri: 'http://167.99.151.251:4000/graphql',
    request: async operation =>
        operation.setContext({
            headers: {
                Authorization: 'Bearer iambatman'
            }
        })
})

const SANGraphQLProvider = props => (
    <ApolloProvider client={client} {...props} />
)

export default SANGraphQLProvider
