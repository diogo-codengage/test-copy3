import gql from 'graphql-tag'

export const CREATE_RATING = gql`
    mutation CreateRating(
        $resourceId: String!
        $resourceType: String!
        $userId: String!
        $rating: RatingRatingInput!
    ) {
        createRating(
            input: {
                resource_id: $resourceId
                resource_type: $resourceType
                user_id: $userId
                rating: $rating
            }
        ) {
            id
        }
    }
`
