import gql from 'graphql-tag'

export const GET_HISTORIC_QUESTIONS = gql`
    query userAnswers($userId: ID!) {
        userAnswers(userId: $userId) {
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
