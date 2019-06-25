import gql from 'graphql-tag'

export const CREATE_BOOKMARK = gql`
    mutation CreateBookmarks(
        $resourceId: String!
        $resourceType: String!
        $userId: String!
    ) {
        createBookmarks(
            input: {
                resource_id: $resourceId
                resource_type: $resourceType
                owner_id: $userId
            }
        ) {
            status
        }
    }
`
