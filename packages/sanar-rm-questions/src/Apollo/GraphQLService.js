import React from 'react'
import ApolloClient, { gql } from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'

const client = new ApolloClient({
    uri: 'http://elb-sanar-residencia-app-bff-qa-53c18f15ca666731.elb.us-east-1.amazonaws.com:4000/graphql',
    onError: console.error,
    request: async operation => 
    operation.setContext({
        headers: {
            //TODO Authorization: await ...
        }
    })
});

export const RMGraphQLProvider = ({ children }) =>
    <ApolloProvider client={client}>{children}</ApolloProvider>
