import React from 'react'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'
import { Auth } from 'aws-amplify'

const getCurrentTokenSession = () => {
    return Auth.currentAuthenticatedUser().then(response => {
        return `Bearer iambatman`
    })
}

const client = new ApolloClient({
    uri: 'http://178.62.228.241:4000/graphql',
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
