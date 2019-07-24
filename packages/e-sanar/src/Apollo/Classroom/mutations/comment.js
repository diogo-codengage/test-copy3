import gql from 'graphql-tag'

export const CREATE_COMMENT = gql`
    mutation CreateComment(
        $text: String!
        $parentId: ID
        $resourceId: ID!
        $resourceType: ResourceType!
    ) {
        createComment(
            input: {
                text: $text
                parent_id: $parentId
                resource_id: $resourceId
                resource_type: $resourceType
            }
        ) {
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
`
