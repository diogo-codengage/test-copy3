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
        $timeInSeconds: Int!
    ) {
        createCourseProgress(
            data: {
                resourceId: $resourceId
                percentage: $percentage
                timeInSeconds: $timeInSeconds
            }
        ) {
            course {
                progress
            }
            specialty {
                ${lastAccessed}
                ${progress}
            }
            subSpecialty {
                ${progress}
                ${lastAccessed}
            }
            lesson {
                ${lastAccessed}
            }
            collection {
                content {
                    video {
                        id
                        progress
                    }
                }  
            }
        }
    }
`
