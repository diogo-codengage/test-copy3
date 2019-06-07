import gql from 'graphql-tag'

export const ANSWER_MUTATION = gql`
    mutation AnswerQuestion(
        $userId: String!
        $alternativeIds: [String]!
        $questionId: String!
    ) {
        questionAnswer(
            input: {
                user_id: $userId
                alternative_ids: $alternativeIds
                question_id: $questionId
            }
        ) {
            answer {
                id
            }
            stats {
                alternatives {
                    id
                    total
                    percent
                }
            }
        }
    }
`
