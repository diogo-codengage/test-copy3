import gql from 'graphql-tag'

export const GET_COMMENTS = gql`
    query Comments($resourceId: ID!, $limit: Int, $skip: Int) {
        comments(resourceId: $resourceId, limit: $limit, skip: $skip)
            @connection(key: "comments") {
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
