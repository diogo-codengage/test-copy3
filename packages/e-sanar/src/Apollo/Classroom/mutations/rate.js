import gql from 'graphql-tag'

export const CREATE_RATING = gql`
    mutation CreateRating(
        $resourceId: String!
        $resourceType: String!
        $rating: RatingRatingInput!
    ) {
        createRating(
            input: {
                resource_id: $resourceId
                resource_type: $resourceType
                rating: $rating
            }
        ) {
            id
            rating {
                scale
                value
                ratio
                type
            }
            resource_id
            resource_type
            user_id
        }
    }
`
