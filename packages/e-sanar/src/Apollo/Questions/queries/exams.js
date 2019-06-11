import gql from 'graphql-tag'

export const GET_EXAMS = gql`
    query {
        exams {
            data {
                id
                name
            }
        }
    }
`
