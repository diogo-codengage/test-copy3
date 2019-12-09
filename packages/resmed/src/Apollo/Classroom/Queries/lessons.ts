import gql from 'graphql-tag'

interface ILastAccessedResource {
    id: string
    type: 'Quiz' | 'Video'
    title: string
}

interface ISpecialty {
    id: string
    name: string
}

interface ISubSpecialty {
    id: string
    name: string
    specialty: ISpecialty
}

interface ILessonLastAccessed {
    id: string
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
    title: string
    completed: boolean
    lastAccessed: ILastAccessed
    subSpecialty: ISubSpecialty
}

export interface ILessons {
    lessons: ILesson[]
}

export const GET_LESSONS = gql`
    query Lessons($parentId: ID!) {
        lessons(where: { parentId: $parentId, status: [active] }) {
            id
            title: name
            status
            completed
            subSpecialty {
                id
                name
                specialty {
                    id
                    name
                }
            }
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
