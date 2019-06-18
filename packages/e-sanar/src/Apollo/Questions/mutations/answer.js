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
                            labels
                            time: created_at
                            user {
                                id
                                name
                                profile_picture
                            }
                        }
                    }
                }
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
