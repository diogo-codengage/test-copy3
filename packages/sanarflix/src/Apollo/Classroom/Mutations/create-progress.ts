import gql from 'graphql-tag'

export const CREATE_PROGRESS = gql`
    mutation CreateProgress($input: ProgressInput) {
        createProgress(input: $input) {
            progress {
                percentage
            }
        }
    }
`
