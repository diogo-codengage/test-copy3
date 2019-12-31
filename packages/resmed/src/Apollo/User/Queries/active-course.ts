import gql from 'graphql-tag'

import { ILastAccessed } from 'Apollo/Subspecialties/Queries/lessons'

export interface ICourse {
    id: string | undefined
    name: string | undefined
    progress: number
    infos?: IInfo[]
    accessed: boolean
    expireDate: string
    lastAccessed: ILastAccessed
}

interface IInfo {
    title: string
    body: string
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
            expireDate
            accessed
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
