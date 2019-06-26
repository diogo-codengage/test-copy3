import React from 'react'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'
import { Auth } from 'aws-amplify'

const getCurrentTokenSession = () => {
    return Auth.currentSession().then(response => {
        return `${response.accessToken.jwtToken}`
    })
}

const errorHandler = async ({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
        graphQLErrors.map(({ message, locations, path }) =>
            console.error(
                '[GraphQL error]: Message: %o, Location: %o, Path: %o',
                message,
                locations,
                path
            )
        )
    }

    if (networkError) {
        console.error('[Network error]: %o', networkError)
        switch (networkError.code) {
            case 'NotAuthorizedException':
                await Auth.signOut()
                window.location.reload()
                break
            default:
                window.location.reload()
        }
    }
}

const client = new ApolloClient({
    uri: 'http://165.22.9.231:4002/graphql',
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
