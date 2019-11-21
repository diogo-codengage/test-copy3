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
            id
            progress
            specialties {
                id
                ${lastAccessed}
                ${progress}
                subSpecialties {
                    id
                    ${progress}
                    ${lastAccessed}
                    lessons {
                        id
                        ${lastAccessed}
                        completed
                    }
                }
            }
        }
    }
`
