import gql from 'graphql-tag'

export const GET_MODULES = gql`
    query modules($courseId: ID) {
        modules(courseId: $courseId) {
            data {
                id
                name
            }
        }
    }
`
