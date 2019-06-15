import React from 'react'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'
import { Auth } from 'aws-amplify'

const getCurrentTokenSession = () => {
    return Auth.currentSession().then(response => {
        return `${response.accessToken.jwtToken}`
    })
}

const client = new ApolloClient({
    uri: 'http://165.22.9.231:4002/graphql',
    onError: console.log,
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
