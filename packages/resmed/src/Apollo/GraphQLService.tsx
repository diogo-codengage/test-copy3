import React from 'react'

import * as Sentry from '@sentry/browser'

import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { HttpLink } from 'apollo-link-http'
import { onError } from 'apollo-link-error'
import { ApolloLink, Observable, split } from 'apollo-link'
import { getMainDefinition } from 'apollo-utilities'
import { WebSocketLink } from 'apollo-link-ws'
import { SubscriptionClient } from 'subscriptions-transport-ws'
import { ApolloProvider } from '@apollo/react-hooks'

import { getAccessToken, logout } from 'Config/AWSCognito'

const { REACT_APP_URL_API, REACT_APP_URL_API_WSS } = process.env

const request = async operation => {
    const token = await getAccessToken()
    return operation.setContext({
        headers: {
            Authorization: token
        }
    })
}

const requestLink = new ApolloLink(
    (operation, forward) =>
        new Observable(observer => {
            let handle
            Promise.resolve(operation)
                .then(oper => request(oper))
                .then(() => {
                    handle = forward(operation).subscribe({
                        next: observer.next.bind(observer),
                        error: observer.error.bind(observer),
                        complete: observer.complete.bind(observer)
                    })
                })
                .catch(observer.error.bind(observer))

            return () => {
                if (handle) handle.unsubscribe()
            }
        })
)

const httpLink = new HttpLink({
    uri: REACT_APP_URL_API
})

export const clientSubscription = new SubscriptionClient(
    !!REACT_APP_URL_API_WSS ? REACT_APP_URL_API_WSS : '',
    {
        reconnect: true,
        timeout: 5000,
        lazy: true,
        connectionParams: async () => {
            const token = await getAccessToken()
            return {
                authorization: token
            }
        }
    }
)

const wsLink = new WebSocketLink(clientSubscription)

const link = split(
    ({ query }) => {
        const definition = getMainDefinition(query)
        return (
            definition.kind === 'OperationDefinition' &&
            definition.operation === 'subscription'
        )
    },
    wsLink,
    httpLink
)

const client = new ApolloClient({
    link: ApolloLink.from([
        onError(({ graphQLErrors, forward, operation, networkError }) => {
            if (graphQLErrors) {
                Sentry.captureException(graphQLErrors)
                graphQLErrors.forEach(error => {
                    console.error('[Grapqhl error]: %o', error)
                    if (error.message['statusCode'] === 401) {
                        logout({})
                        localStorage.clear()
                        window.location.hash = '/auth/entrar'
                    }
                })
                return forward(operation)
            }
            if (networkError) {
                console.log(`[Network error]: %o`, networkError)
                Sentry.captureException(networkError)
            }
        }),
        requestLink,
        link
    ]),
    cache: new InMemoryCache()
})

export const RMGraphQLProvider: React.FC<{
    children: React.ReactNode
}> = props => <ApolloProvider client={client as any} {...props} />

RMGraphQLProvider.displayName = 'GraphQLServiceApolloClient'
