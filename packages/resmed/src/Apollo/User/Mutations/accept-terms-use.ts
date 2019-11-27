import gql from 'graphql-tag'

export const ACCEPT_TERMS_USE_MUTATION = gql`
    mutation AcceptTermsUse {
        acceptTermsUse {
            id
            name
            profilePicture
            hasActiveSubscription
        }
    }
`
