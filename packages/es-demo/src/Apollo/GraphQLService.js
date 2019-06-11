import React from 'react'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'

const client = new ApolloClient({
    uri:
        'http://elb-newesanar-bff-qa-f30dd4b4744e4ff6.elb.us-east-1.amazonaws.com:4000/graphql',
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
