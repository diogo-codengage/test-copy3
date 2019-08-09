import gql from 'graphql-tag'

export const GET_QUESTION = gql`
    query Question($questionId: ID!) {
        question(id: $questionId) {
            id
            statement
            instituition {
                id
                name
            }
            alternatives {
                data {
                    id
                    text
                    index
                    correct
                }
            }
            images {
                data {
                    id
                }
            }
        }
    }
`
