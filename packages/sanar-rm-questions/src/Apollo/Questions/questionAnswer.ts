import { gql } from 'apollo-boost'


export const questionAnswer = gql`
    
    mutation QuestionAnswer (
        $userId: String!
        $questionId: String!
        $alternativeId: String
        $correct: Boolean!
    )   {
        questionAnswer(
            input: {
                question_id: $questionId
                alternative_ids:[ $alternativeId ]
                user_id: $userId
                correct: $correct
            }) {
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
