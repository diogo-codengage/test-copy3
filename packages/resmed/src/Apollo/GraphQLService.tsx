import React from 'react'
import ApolloClient, { Operation, PresetConfig } from 'apollo-boost'
import { ApolloProvider } from '@apollo/react-hooks'
import { ErrorResponse } from 'apollo-link-error'

const onError = ({
    graphQLErrors,
    forward,
    operation,
    networkError
}: ErrorResponse) => {
    if (graphQLErrors) {
        graphQLErrors.forEach(error => {
            if (error.message.includes('AUTH_REQUIRED')) {
                localStorage.clear()
                window.location.hash = '/#/auth'
            }
        })
        return forward(operation)
    }

    if (networkError) {
        console.error('[Network error]: %o', networkError)
        window.location.hash = '/#/portal/erro'
    }
}

const client = new ApolloClient({
    uri: process.env.REACT_APP_URL_API,
    onError,
    request: async (operation: Operation) =>
        operation.setContext({
            headers: {
                Authorization: ''
            }
        })
} as any)

export const RMGraphQLProvider: React.FC<{
    children: React.ReactNode
}> = props => <ApolloProvider client={client} {...props} />
