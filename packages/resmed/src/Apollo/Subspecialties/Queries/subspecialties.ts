import gql from 'graphql-tag'

interface IProgress {
    all: number
    me: number
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

export interface ISubspecialtyItems {
    id: string
    name: string
    status: 'active' | 'inactive' | 'construction'
    progress: IProgress
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
    }
`
