import gql from 'graphql-tag'

export const GET_HISTORIC_QUESTIONS = gql`
    query userAnswers($userId: ID!, $limit: Int, $skip: Int, $where: String) {
        userAnswers(
            userId: $userId
            limit: $limit
            skip: $skip
            where: $where
        ) {
            data {
                text_answer
                correct
                question {
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
                            correct
                        }
                    }
                }
            }
        }
    }
`
