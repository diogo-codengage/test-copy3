import { gql } from 'apollo-boost'


export const questionAnswer = gql`
    
    mutation QuestionAnswer (
        $questionId: String!
        $alternativeId: String
        $correct: Boolean!
    )   {
        questionAnswer(
            input: {
                question_id: $questionId
                alternative_ids:[ $alternativeId ]
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
