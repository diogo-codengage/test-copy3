import gql from 'graphql-tag'

export const CREATE_RATING = gql`
    mutation CreateRating($lessonId: ID!, $value: Int!) {
        setRating(
            data: {
                resourceId: $lessonId
                type: Level
                ratingValue: { type: numeric, value: $value }
            }
        ) {
            id
        }
    }
`
