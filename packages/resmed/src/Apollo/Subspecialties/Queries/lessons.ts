import gql from 'graphql-tag'

interface ILastAccessedResource {
    id: string
    type: 'Quiz' | 'Video'
    index: number
    title: string
}

export interface ILastAccessed {
    specialtyId: string
    subSpecialtyId?: string
    lessonId: string
    collectionId: string
    resource: ILastAccessedResource
}

export interface ILesson {
    id: string
    name: string
    status: 'active' | 'inactive' | 'construction'
    lastAccessed: ILastAccessed
}

export const GET_LESSONS = gql`
    query Lessons($parentId: ID!) {
        lessons(where: { parentId: $parentId }) {
            id
            name
            status
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
        }
    }
`
