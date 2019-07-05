import gql from 'graphql-tag'

export const GET_BOOKMARK = gql`
    query Bookmark($resourceId: ID!) {
        bookmark(resourceId: $resourceId) {
            id
            resource_type
            resource_id
            owner_id
        }
    }
`
