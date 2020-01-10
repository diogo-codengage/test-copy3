import gql from 'graphql-tag'

interface ILastAccessedResource {
    id: string
    type: 'Quiz' | 'Video'
    title: string
}

interface ILessonLastAccessed {
    id: string
    name: string
    index: number
}
export interface ILastAccessed {
    specialtyId: string
    subSpecialtyId?: string
    collectionId: string
    lesson: ILessonLastAccessed
    resource: ILastAccessedResource
}

export interface ILesson {
    id: string
    name: string
    status: 'active' | 'inactive' | 'construction'
    completed: boolean
}

export interface ILessonsQuery {
    lessons: ILesson[]
}

export interface ILessonLastAccessedQuery {
    lesson: {
        lastAccessed: ILastAccessed
    }
}

export const GET_LESSON_LAST_ACCESSED = gql`
    query LessonLastAccessed($parentId: ID!) {
        lesson(where: { id: $parentId }) {
            lastAccessed {
                specialtyId
                subSpecialtyId
                collectionId
                lesson {
                    id
                    index
                }
                resource {
                    id
                    type
                    title
                }
            }
        }
    }
`

export const GET_LESSONS = gql`
    query Lessons($parentId: ID!) {
        lessons(where: { parentId: $parentId }) {
            id
            name
            status
            completed
        }
    }
`
