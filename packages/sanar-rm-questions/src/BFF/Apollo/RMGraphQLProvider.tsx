import React from 'react'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'
import { isDevEnvironment, isLocalhost, isProdEnvironment } from '../../Util/environment'
import { getUserToken } from '../../Util/getUserToken'

const getGraphqlUri = () => {
    const local = 'http://elb-sanar-residencia-app-bff-qa-53c18f15ca666731.elb.us-east-1.amazonaws.com:4000/graphql';
    // const dev = 'https://bff.sanarresidenciamedica.com.br/dev/graphql';
    // const prod = 'https://bff.sanarresidenciamedica.com.br/prod/graphql';

    switch(true) {
        case isLocalhost():
            return local
        case isProdEnvironment():
            return local;
        case isDevEnvironment():
            return local; // TODO: fix this, change to dev
        default:
            return local;
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
