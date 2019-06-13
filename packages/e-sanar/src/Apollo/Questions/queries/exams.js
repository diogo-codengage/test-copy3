import gql from 'graphql-tag'

export const GET_EXAMS = gql`
    query {
        exams {
            data {
                value: id
                label: name
            }
        }
    }
`
