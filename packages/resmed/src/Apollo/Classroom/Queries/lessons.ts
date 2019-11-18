import gql from 'graphql-tag'

interface ILastAccessedResource {
    id: string
    type: 'Quiz' | 'Video'
    index: number
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

export interface ILastAccessed {
    specialtyId: string
    subSpecialtyId?: string
    lessonId: string
    collectionId: string
    resource: ILastAccessedResource
}

export interface ILesson {
    id: string
    title: string
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
