import gql from 'graphql-tag'

export const GET_MODULES = gql`
    query Modules($courseId: ID!, $enrollmentId: ID!, $limit: Int, $skip: Int) {
        modules(
            courseId: $courseId
            enrollmentId: $enrollmentId
            limit: $limit
            skip: $skip
        ) {
            data {
                id
                name
                slug
                index
                durantion
                cover_picture_url
                last_resource_id
                last_resource_type
                progress {
                    done
                    total
                }
            }
            count
        }
    }
`
