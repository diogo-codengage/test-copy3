import gql from 'graphql-tag'

export const ANSWER_MUTATION = gql`
    mutation AnswerQuestion($alternativeId: ID!, $questionId: ID!) {
        answerQuestion(
            data: {
                alternative_ids: [$alternativeId]
                question_id: $questionId
            }
        ) {
            id
            alternatives {
                id
                isCorrect
                percentageFromTotalAnswers
            }
            comments {
                id
                text
                user {
                    id
                    name
                    profilePicture
                }
            }
        }
    }
`
