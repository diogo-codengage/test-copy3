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
                lessonId
                collectionId
                resource {
                    id
                    index
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
