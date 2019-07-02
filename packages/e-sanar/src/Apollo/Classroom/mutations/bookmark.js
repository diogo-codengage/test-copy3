import gql from 'graphql-tag'

export const CREATE_BOOKMARK = gql`
    mutation CreateBookmarks(
        $resourceId: String!
        $resourceType: String!
        $userId: String!
    ) {
        createBookmarks(
            input: { resource_id: $resourceId, resource_type: $resourceType }
        ) {
            bookmark {
                id
                resource_type
                resource_id
                owner_id
            }
        }
    }
`
