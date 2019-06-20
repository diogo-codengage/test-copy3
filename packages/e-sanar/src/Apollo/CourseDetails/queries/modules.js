import gql from 'graphql-tag'

export const GET_MODULES = gql`
    query Modules($courseId: ID!, $enrollmentId: ID!) {
        modules(courseId: $courseId, enrollmentId: $enrollmentId) {
            data {
                id
                name
                slug
                index
                durantion
                cover_picture
                progress {
                    done
                    total
                    # status
                }
            }
            count
        }
    }
`
