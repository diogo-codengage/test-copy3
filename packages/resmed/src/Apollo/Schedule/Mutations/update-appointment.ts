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
}
export interface IAccessContent {
    specialtyId: string
    subSpecialtyId?: string
    collectionId: string
    lesson: ILessonLastAccessed
    resource: ILastAccessedResource
}

export interface IAppointment {
    id: string
    title: string
    description: string
    start: string
    end: string
    resource: {
        id: string
        type: 'Live' | 'Level' | 'Exam'
    }
    fixed: boolean
    seen: boolean
    timeInMinutes: number
    accessContent: IAccessContent
}

export interface IUpdateAppointment {
    updateAppointment: IAppointment
}

export const UPDATE_APPOINTMENT = gql`
    mutation UpdateAppointment($date: Date!, $id: ID) {
        updateAppointment(where: { id: $id }, data: { date: $date }) {
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
