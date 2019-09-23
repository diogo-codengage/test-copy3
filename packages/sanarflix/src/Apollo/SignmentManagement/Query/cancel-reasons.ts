import gql from 'graphql-tag'

export const GET_CANCEL_REASONS = gql`
    query CancelReasons {
        cancelSubsctiptionsCauses {
            cause
            description
        }
    }
`
