import React from 'react'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from '@apollo/react-hooks'
import { getInstance } from 'Config/AWSCognito'

const config = getInstance()

const getValidSession = cognitoUser => {
    return cognitoUser.getSession((_, session) => {
        if (session.isValid()) return session
        else
            cognitoUser.refreshSession(
                session.getRefreshToken(),
                (err, nSession) => {
                    return nSession
                }
            )
    })
}

const getAccessToken = async () => {
    const cognitoUser = config.userPool.getCurrentUser()

    if (!!cognitoUser) {
        const session = getValidSession(cognitoUser)
        return session.getIdToken().getJwtToken()
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
