import gql from 'graphql-tag'

export const PAUSE_SUBSCRIPTION = gql`
    mutation PauseSubscription($input: PauseSubscriptionInput) {
        pauseSubscription(input: $input) {
            id
        }
    }
`
