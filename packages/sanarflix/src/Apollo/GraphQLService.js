import React from 'react'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from '@apollo/react-hooks'
import { getInstance } from 'Config/AWSCognito'

const config = getInstance()

const getAccessToken = () => {
    const cognitoUser = config.userPool.getCurrentUser()
    console.log({ cognitoUser })
    if (!!cognitoUser) {
        return cognitoUser.getSession((_, session) => {
            return session.getIdToken().getJwtToken()
        })
    }
}

const client = new ApolloClient({
    uri: process.env.REACT_APP_URL_API,
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
