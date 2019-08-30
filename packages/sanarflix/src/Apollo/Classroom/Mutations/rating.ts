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
            video {
                id
                rating {
                    id
                    rating {
                        value
                    }
                }
            }
        }
    }
`
