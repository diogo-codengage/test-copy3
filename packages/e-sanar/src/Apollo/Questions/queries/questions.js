import gql from 'graphql-tag'

export const GET_QUESTIONS = gql`
    query {
        questions {
            data {
                id
                statement
                year
                observation
                type
                difficulty {
                    level
                    name
                }
                instituition {
                    id
                    name
                }
                alternatives {
                    data {
                        id
                        text
                    }
                }
            }
        }
    }
`
