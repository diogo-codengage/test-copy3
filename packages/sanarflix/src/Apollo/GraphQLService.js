import React from 'react'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from '@apollo/react-hooks'
import { getInstance } from 'Config/AWSCognito'

const config = getInstance()

const getAccessToken = () =>
    config.user.getSession((err, session) => {
        // if (err) window.location = '#/auth'
        return session.getIdToken().getJwtToken()
    })

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
