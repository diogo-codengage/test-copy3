import { gql } from 'apollo-boost'

export const questionSkip = gql`mutation QuestionSkip(
    $questionId: ID!
)  {
    questionSkip(input: { question_id: $questionId}) {
        status
    }
}`
