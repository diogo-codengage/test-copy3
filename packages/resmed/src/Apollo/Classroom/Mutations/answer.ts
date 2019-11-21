import gql from 'graphql-tag'

export const ANSWER_MUTATION = gql`
    mutation AnswerQuestion($alternativeId: ID!, $questionId: ID!) {
        answerQuestion(
            data: { alternativeIds: [$alternativeId], questionId: $questionId }
        ) {
            answer {
                id
                question {
                    id
                    alternatives {
                        data {
                            id
                            correct
                        }
                    }
                    comments {
                        data {
                            id
                            text
                        }
                    }
                }
            }
        }
    }
`
