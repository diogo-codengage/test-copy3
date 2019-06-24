import React from 'react'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'

import Auth from '@aws-amplify/auth';
import Amplify from 'aws-amplify';

Amplify.configure({
    Auth: {
        userPoolId: 'us-east-1_EJnJD6R02',
        userPoolWebClientId: '2uk58uan46uqeqct7lm6osnlck',
    },
});

const getUserToken = async () => {
    const user = await Auth.signIn('testesanar@gmail.com', 'sanar123');
    console.log({user});
    return user.signInUserSession.idToken.jwtToken
}


const client = new ApolloClient({
    uri: 'http://elb-sanar-residencia-app-bff-qa-53c18f15ca666731.elb.us-east-1.amazonaws.com:4000/graphql',
    onError: console.error,
    request: async operation => {
        operation.setContext({
            headers: {
                //TODO Authorization: await ...
                "Authorization": await getUserToken()
            }
        })
    }
});

export const RMGraphQLProvider = ({ children }) =>
    <ApolloProvider client={client}>{children}</ApolloProvider>
