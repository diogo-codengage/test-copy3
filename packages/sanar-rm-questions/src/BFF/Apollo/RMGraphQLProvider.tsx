import React from 'react'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'
import { isDevEnvironment, isLocalhost, isProdEnvironment } from '../../Util/environment'

const getGraphqlUri = () => {
    const local = 'https://bff2.sanarresidenciamedica.com.br/graphql';
    // const dev = 'https://bff.sanarresidenciamedica.com.br/dev/graphql';
    //const prod = 'https://bff.sanarresidenciamedica.com.br/prod/graphql';

    switch(true) {
        case isLocalhost():
            return local;
        case isDevEnvironment():
            return local; // TODO: fix this, change to dev
        case isProdEnvironment():
            return prod;
        default:
            return prod;
    }
}

export const apolloClient = new ApolloClient({
    uri: getGraphqlUri(),
    onError: console.error,
    request: async operation => {
        operation.setContext({
            headers: {
                Authorization: 'vfNk0q77CVMOApMqOaOaGD6OrT9huzArKbOqzfTd2AYHTyZM2dGroVDbDdQOHaJv'
            }
        })
    }
});

export const RMGraphQLProvider = ({ children }) =>
    <ApolloProvider client={apolloClient}>{children}</ApolloProvider>
