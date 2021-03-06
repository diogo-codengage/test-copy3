import gql from 'graphql-tag'

export const ANSWER_MUTATION = gql`
    mutation AnswerQuestion($alternativeId: ID!, $questionId: ID!) {
        answerQuestion(
            data: { alternativesIds: [$alternativeId], questionId: $questionId }
        ) {
            question {
                id
                alternatives {
                    data {
                        id
                        isCorrect
                    }
                }
                comment {
                    text
                    user {
                        id
                        name
                        profilePicture
                    }
                    time: createdAt
                }
            }
            stats {
                id
                percent
            }
        }
    }
`
