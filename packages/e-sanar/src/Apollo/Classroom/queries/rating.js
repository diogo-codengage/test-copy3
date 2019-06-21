import gql from 'graphql-tag'

export const GET_RATING = gql`
    query Rating($resourceId: ID!, $userId: ID!) {
        rating(resourceId: $resourceId, userId: $userId) {
            id
            rating {
                value
            }
        }
    }
`
