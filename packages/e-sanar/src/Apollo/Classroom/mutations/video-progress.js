import gql from 'graphql-tag'

export const CREATE_PROGRESS = gql`
    mutation CreateProgress(
        $resourceId: String!
        $resourceType: String!
        $percentage: Int
        $timeInSeconds: Int
        $enrollmentId: String!
        $parentVideoId: String
    ) {
        createProgress(
            input: {
                resource_id: $resourceId
                resource_type: $resourceType
                percentage: $percentage
                time_in_seconds: $timeInSeconds
                enrollment_id: $enrollmentId
                parent_video_id: $parentVideoId
            }
        ) {
            progress {
                id
                percentage
                timeInSeconds
            }
        }
    }
`
