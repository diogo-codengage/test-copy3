import React from 'react'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'
import { getUserToken } from './getUserToken'
import { isDevEnvironment, isLocalhost, isProdEnvironment } from '../Util/configs'

let getGraphqlUri = () => {
    const local = 'http://elb-newesanar-bff-qa-f30dd4b4744e4ff6.elb.us-east-1.amazonaws.com:4000/graphql';
    const dev = 'https://bff.sanarresidenciamedica.com.br/dev/graphql';
    const prod = 'https://bff.sanarresidenciamedica.com.br/prod/graphql';

    switch(true) {
        case isLocalhost():
            return local
        case isProdEnvironment():
            return prod;
        case isDevEnvironment():
            return dev;
        default:
            return local;
    }
}

const client = new ApolloClient({
    uri: getGraphqlUri(),
    request: async operation => {
        operation.setContext({
            headers: {
                Authorization: await getUserToken()
            }
        })
    }
})

const SANGraphQLProvider = ({children}) => {
    return (
        <ApolloProvider client={client}>{children}</ApolloProvider>
    )
}

// const a = async () => {
//     console.log('passando');
//     console.log( await getUserToken());
// }
//
// a()

export default SANGraphQLProvider
