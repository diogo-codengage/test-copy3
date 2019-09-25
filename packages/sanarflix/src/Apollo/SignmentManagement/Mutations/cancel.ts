import gql from 'graphql-tag'

export const CANCEL_SUBSCRIPTION = gql`
    mutation CancelSubscription($input: CancelSubscriptionInput) {
        cancelSubscription(input: $input) {
            id
        }
    }
`
