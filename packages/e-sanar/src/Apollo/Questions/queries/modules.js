import gql from 'graphql-tag'

export const GET_MODULES = gql`
    query Modules($courseId: ID!, $enrollmentId: ID!) {
        modules(courseId: $courseId, enrollmentId: $enrollmentId) {
            data {
                value: id
                label: name
            }
        }
    }
`
