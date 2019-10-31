import React from 'react'
import ApolloClient, { Operation } from 'apollo-boost'
import { ApolloProvider } from '@apollo/react-hooks'
import { ErrorResponse } from 'apollo-link-error'

import { getAccessToken } from 'Config/AWSCognito'

const onError = ({
    graphQLErrors,
    forward,
    operation,
    networkError
}: ErrorResponse) => {
    if (graphQLErrors) {
        graphQLErrors.forEach(error => {
            if (error.message.statusCode === 401) {
                localStorage.clear()
                window.location.hash = '/#/auth/entrar'
            }
        })
        return forward(operation)
    }

    if (networkError) {
        console.error('[Network error]: %o', networkError)
        window.location.hash = '/#/inicio/erro'
    }
}

const client = new ApolloClient({
    uri: process.env.REACT_APP_URL_API,
    onError,
    request: (operation: Operation) =>
        operation.setContext({
            headers: {
                Authorization: getAccessToken()
            }
        })
} as any)

export const RMGraphQLProvider: React.FC<{
    children: React.ReactNode
}> = props => <ApolloProvider client={client} {...props} />
