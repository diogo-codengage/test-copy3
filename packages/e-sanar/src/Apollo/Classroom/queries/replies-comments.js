import gql from 'graphql-tag'

export const GET_REPLIES_COMMENTS = gql`
    query RepliesComment(
        $resourceId: ID!
        $parentId: ID!
        $limit: Int
        $skip: Int
    ) {
        repliesComment(
            resourceId: $resourceId
            parentId: $parentId
            limit: $limit
            skip: $skip
        ) {
            count
            data {
                id
                parent_id
                time: created_at
                likes_count
                dislikes_count
                replies_count
                commented_by_user
                liked_by_user
                disliked_by_user
                text
                labels
                user {
                    id
                    name
                    profile_picture
                }
            }
        }
    }
`
