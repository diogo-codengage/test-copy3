import gql from 'graphql-tag'

interface IProgress {
    all: number
    me: number
}

export interface ImageSizes {
    small?: string
    medium?: string
    large?: string
    original?: string
}

interface ILastAccessedResource {
    id: string
    type: 'Quiz' | 'Video'
    title: string
}

interface ILesson {
    id: string
    index: number
}

export interface ILastAccessed {
    specialtyId: string
    subSpecialtyId?: string
    collectionId: string
    lesson: ILesson
    resource: ILastAccessedResource
}

export interface ISpecialties {
    id: string
    name: string
    progress: IProgress
    hasSubSpecialties: boolean
    images: ImageSizes
    lastAccessed: ILastAccessed
}

export const GET_SPECIALTIES = gql`
    query Specialties($courseId: ID) {
        specialties(where: { courseId: $courseId }) {
            id
            name
            hasSubSpecialties
            images {
                large
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
            progress {
                all
                me
            }
        }
    }
`
