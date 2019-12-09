import React from 'react'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from '@apollo/react-hooks'
import { getInstance } from 'Config/AWSCognito'
import { CognitoUserSession } from 'amazon-cognito-identity-js'

const getAccessToken = async () => {
    const { user } = getInstance();
    return new Promise((resolve, reject) => {
        try {
            user.getSession( (err, session: CognitoUserSession) => {
                if(err) reject(err);
                const jwtToken = session.getIdToken().getJwtToken();
                resolve(jwtToken);
            })
        } catch (e) {
            window.localStorage.clear();
            reject(e);
        }
    });
}

const onError = ({ graphQLErrors, forward, operation, networkError }) => {
    if (graphQLErrors) {
        graphQLErrors.forEach(error => {
            if (error.message.includes('AUTH_REQUIRED')) {
                localStorage.clear()
                window.location.hash = '/auth'
            }
        })
        return forward(operation)
    }

    if (networkError) {
        console.error('[Network error]: %o', networkError)
        window.location.hash = '/portal/erro'
    }
}

const client = new ApolloClient({
    uri: process.env.REACT_APP_URL_API,
    onError,
    request: async operation => {
        const token = await getAccessToken();
        return operation.setContext({
            headers: {
                Authorization: token
            }
        })
    }
} as any)

const FLXGraphQLProvider = props => (
    <ApolloProvider client={client} {...props} />
)

export default FLXGraphQLProvider
