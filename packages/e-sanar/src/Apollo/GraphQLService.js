import React from 'react'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'
import { Auth } from 'aws-amplify'

const getCurrentTokenSession = () => {
    return Auth.currentSession().then(response => {
        return `${response.idToken.jwtToken}`
    })
}

const errorHandler = ({ graphQLErrors, networkError, forward, operation }) => {
    if (graphQLErrors) {
        graphQLErrors.map(({ message, locations, path }) =>
            console.error(
                '[GraphQL error]: Message: %o, Location: %o, Path: %o',
                message,
                locations,
                path
            )
        )
        return forward(operation)
    }

    if (networkError) {
        console.error('[Network error]: %o', networkError)
        switch (networkError.code) {
            case 'NotAuthorizedException':
                Auth.signOut().then(() => window.location.reload())
                break
            default:
        }
    }
}

const client = new ApolloClient({
    uri: process.env.REACT_APP_URL_API,
    onError: errorHandler,
    request: async operation =>
        operation.setContext({
            headers: {
                Authorization: await getCurrentTokenSession()
            }
        })
})

const SANGraphQLProvider = props => (
    <ApolloProvider client={client} {...props} />
)

export default SANGraphQLProvider
