import gql from 'graphql-tag'

import { IAppointment } from './appointments'

export interface ISuggestedClassQuery {
    suggestedClass: IAppointment
}

export const GET_SUGGESTED_CLASS = gql`
    {
        suggestedClass {
            id
            title
            description
            start: date
            end: endDate
            resource {
                id
                type
            }
            fixed
            seen
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
