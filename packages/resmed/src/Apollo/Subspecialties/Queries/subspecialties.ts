import gql from 'graphql-tag'

interface IProgress {
    all: number
    me: number
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

export interface ISubspecialtyItems {
    id: string
    name: string
    status: 'active' | 'inactive' | 'construction'
    progress: IProgress
    image: string
    lastAccessed: ILastAccessed
}
export interface ISubspecialty {
    totalCount: number
    items: ISubspecialtyItems[]
}

export const GET_SUBSPECIALTIES = gql`
    query SubSpecialties($parentId: ID!) {
        subSpecialties(where: { parentId: $parentId }) {
            totalCount
            items {
                id
                name
                status
                progress {
                    me
                    all
                }
                image
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
    }
`
