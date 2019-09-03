import React from 'react'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from '@apollo/react-hooks'
import { getInstance } from 'Config/AWSCognito'

const getAccessToken = async () => {
    const config = getInstance()
    const cognitoUser = config.userPool.getCurrentUser()
    if (!!cognitoUser) {
        await cognitoUser.getSession((_, session) => {
            return session.getIdToken().getJwtToken()
        })
    }
}

const onError = ({ graphQLErrors, forward, operation }) => {
    if (graphQLErrors) {
        graphQLErrors.forEach(error => {
            if (error.message.includes('AUTH_REQUIRED')) {
                localStorage.clear()
                window.location.hash = '/#/auth'
            }
        })
        return forward(operation)
    }
}

const client = new ApolloClient({
    uri: process.env.REACT_APP_URL_API,
    onError,
    request: async operation =>
        operation.setContext({
            headers: {
                Authorization: await getAccessToken()
            }
        })
})

const FLXGraphQLProvider = props => (
    <ApolloProvider client={client} {...props} />
)

export default FLXGraphQLProvider
