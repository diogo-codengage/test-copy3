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
        ) {
            count
            data {
                id
                resource_title
                resource_thumbnail
                resource_type
                level_index
                resource_index
            }
        }
    }
`