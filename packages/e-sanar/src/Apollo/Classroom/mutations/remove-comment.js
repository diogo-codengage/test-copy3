import gql from 'graphql-tag'

export const REMOVE_COMMENT = gql`
    mutation RemoveComment($commentId: ID!) {
        removeComment(input: { comment_id: $commentId }) {
            comment_id
        }
    }
`
