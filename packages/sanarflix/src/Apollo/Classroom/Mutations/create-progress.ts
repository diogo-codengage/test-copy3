import gql from 'graphql-tag'

export const CREATE_PROGRESS = gql`
    mutation CreateProgress($input: ProgressInput) {
        createProgress(input: $input) {
            progress {
                percentage
            }
            theme {
                id
                progress_percentage
            }
            course {
                id
                progress_percentage
            }
        }
    }
`
