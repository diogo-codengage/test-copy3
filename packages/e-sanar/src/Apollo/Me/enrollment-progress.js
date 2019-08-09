import gql from 'graphql-tag'

export const GET_ENROLLMENT_PROGRESS = gql`
    query EnrollmentProgress($enrollmentId: ID!) {
        enrollmentProgress(enrollmentId: $enrollmentId) {
            id
            progress_percentage
        }
    }
`
