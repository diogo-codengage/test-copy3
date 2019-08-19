import React from 'react'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'
import { isDevEnvironment, isLocalhost, isProdEnvironment } from '../../Util/environment'
import { getUserToken } from '../../Util/getUserToken'

const getGraphqlUri = () => {
    const dev = 'http://nlb-residencia-qa-aa2d4c0241e3f160.elb.us-east-1.amazonaws.com/graphql';
    const prod = 'https://bff.sanarresidenciamedica.com.br/graphql'

    switch(true) {
        case isLocalhost():
            return dev // TODO: fix this, change to local
        case isDevEnvironment():
            return dev // TODO: fix this, change to dev
        case isProdEnvironment():
            return prod
        default:
            return prod
    }
}

export const apolloClient = new ApolloClient({
    uri: getGraphqlUri(),
    onError: console.error,
    request: async operation => {
        operation.setContext({
            headers: {
                Authorization: await getUserToken()
            }
        })
    }
});

export const RMGraphQLProvider = ({ children }) =>
    <ApolloProvider client={apolloClient}>{children}</ApolloProvider>
