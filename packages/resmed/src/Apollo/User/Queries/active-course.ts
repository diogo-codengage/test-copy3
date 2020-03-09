import gql from 'graphql-tag'

import { ILastAccessed } from 'Apollo/Subspecialties/Queries/lessons'

export interface ICourse {
    id: string
    name: string
    progress: number
    infos?: IInfo[]
    accessed: boolean
    expireDate: string
    startDate: string
    images: IImages
    lastAccessed: ILastAccessed
}

interface IInfo {
    title: string
    body: string
}

interface IImages {
    original: string
}

export interface IActiveCourseQuery {
    activeCourse: ICourse
}

export const GET_ACTIVE_COURSE = gql`
    {
        activeCourse {
            id
            name
            progress
            infos {
                title
                body
            }
            startDate
            expireDate
            accessed
            images {
                original
            }
            lastAccessed {
                specialtyId
                subSpecialtyId
                collectionId
                lesson {
                    id
                    name
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
