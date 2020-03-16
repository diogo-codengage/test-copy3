import gql from 'graphql-tag'

export const SKIP_MUTATION = gql`
    mutation SkipQuestion($questionId: ID!) {
        skipQuestion(
            data: { questionId: $questionId }
        ) {
            question {
                id
            }
        }
    }
`
