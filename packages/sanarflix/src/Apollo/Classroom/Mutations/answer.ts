import gql from 'graphql-tag'

export const ANSWER_MUTATION = gql`
    mutation AnswerQuestion($alternativeId: String!, $questionId: String!) {
        questionAnswer(
            input: {
                alternative_ids: [$alternativeId]
                question_id: $questionId
            }
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
