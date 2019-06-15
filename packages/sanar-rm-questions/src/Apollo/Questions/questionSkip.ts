import { gql } from 'apollo-boost'

export const questionSkip = gql`mutation QuestionSkip(
    $userId: ID!
    $questionId: ID!
)  {
    questionSkip(input: {user_id: $userId question_id: $questionId}) {
        status
    }
}`
