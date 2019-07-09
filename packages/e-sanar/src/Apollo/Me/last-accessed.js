import gql from 'graphql-tag'

export const GET_LAST_ACCESSED = gql`
    query lastAccessed($enrollmentId: ID!) {
        lastAccessed(enrollmentId: $enrollmentId) {
            last_accessed_at
            resource_type
            module_id
            resource_id
            module_order
            resource_order
            module_title
            cover_picture_url
            module_progress {
                done
                total
                status
            }
            thumbnail
            path
        }
    }
`
