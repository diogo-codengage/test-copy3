import gql from 'graphql-tag'

import { IAccessContent } from './appointments'

export interface IAppointment {
    id: string
    title: string
    image: string
    timeInMinutes: number
    accessContent: IAccessContent
}
export interface ISuggestedClassQuery {
    suggestedClass: IAppointment
}

export const GET_SUGGESTED_CLASS = gql`
    {
        suggestedClass {
            id
            title
            image
            timeInMinutes
            accessContent {
                specialtyId
                subSpecialtyId
                collectionId
                lesson {
                    id
                }
                resource {
                    id
                    type
                }
            }
        }
    }
`
