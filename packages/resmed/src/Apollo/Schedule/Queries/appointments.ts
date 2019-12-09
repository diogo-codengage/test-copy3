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

export interface IAppointmentsQuery {
    appointments: IAppointment[]
}

export const GET_APPOINTMENTS = gql`
    query Appointments($start: Date!, $end: Date!, $exact: Boolean) {
        appointments(where: { start: $start, end: $end, exact: $exact }) {
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
