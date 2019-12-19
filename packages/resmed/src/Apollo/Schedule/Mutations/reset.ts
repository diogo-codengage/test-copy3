import gql from 'graphql-tag'

interface ILastAccessedResource {
    id: string
    type: 'Quiz' | 'Video'
    title: string
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
    resourceType: 'Live' | 'Level' | 'Exam'
    fixed: boolean
    seen: boolean
    timeInMinutes: number
    accessContent: IAccessContent
}
interface IInterval {
    start: string
    end: string
}
export interface IResetSchedule {
    resetSchedule: {
        items: IAppointment[]
        hasModified: boolean
        interval: IInterval
    }
}

export const RESET_SCHEDULE = gql`
    mutation ResetSchedule($start: Date!, $end: Date!) {
        resetSchedule(where: { start: $start, end: $end }) {
            hasModified: didModified
            interval {
                start
                end
            }
            items {
                id
                title
                description
                start: date
                end: endDate
                resourceType
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
    }
`
