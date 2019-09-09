import gql from 'graphql-tag'

export const CREATE_BOOKMARK = gql`
    mutation CreateBookmarks(
        $resourceId: String!
        $resourceType: ResourceType!
    ) {
        createBookmarks(
            input: { resource_id: $resourceId, resource_type: $resourceType }
        ) {
            document {
                id
                bookmarked
            }
            video {
                id
                bookmarked
            }
            question {
                id
                bookmarked
            }
        }
    }
`
