import gql from 'graphql-tag'

const lastAccessed = `
    lastAccessed {
        specialtyId
        subSpecialtyId
        lessonId
        collectionId
        resource {
            id
            index
            type
            title
        }
    }
`

const progress = `
    progress {
        all
        me
    }
`

export const CREATE_PROGRESS = gql`
    mutation CreateProgress(
        $resourceId: ID!
        $percentage: Int!
        $timeInSeconds: Int
        $resourceType: ResourceType
    ) {
        createCourseProgress(
            data: {
                resourceId: $resourceId
                percentage: $percentage
                timeInSeconds: $timeInSeconds
                resourceType: $resourceType
            }
        ) {
            course {
                id
                progress
            }
            specialty {
                id
                ${lastAccessed}
                ${progress}
            }
            subSpecialty {
                id
                ${progress}
                ${lastAccessed}
            }
            lesson {
                id
                ${lastAccessed}
            }
            collection {
                id
                content {
                    video {
                        id
                        progress
                        timeInSeconds
                    }
                }  
            }
        }
    }
`
