import gql from 'graphql-tag'

export const GET_BOOKMARKS = gql`
    query Bookmarks(
        $enrollmentId: ID!
        $resourceType: ResourceType
        $limit: Int
        $skip: Int
    ) {
        bookmarks(
            enrollmentId: $enrollmentId
            resourceType: $resourceType
            limit: $limit
            skip: $skip
            updatedOrder: desc
        ) @connection(key: "bookmarks") {
            count
            data {
                id
                resource_title
                resource_thumbnail
                resource_type
                level_id
                level_index
                resource_id
                resource_index
            }
        }
    }
`
