import gql from 'graphql-tag'

export interface IProfile {
    id: string
    graduationStep:
        | 'firstYear'
        | 'secondYear'
        | 'thirdYear'
        | 'fourthYear'
        | 'fifthYear'
        | 'sixthYear'
        | 'formed'
    institutionIds?: string[]
    specialtyIds?: string[]
    testExperience: 'none' | 'one' | 'many'
    preparatoryCourseStatus: 'inProgress' | 'completed' | 'missing'
    preparatoryCourseName?: string
    objective: 'college' | 'residence' | 'revalidate'
    userId: string
    courseId?: string
}

export interface IMe {
    id: string
    name: string
    profilePicture: string
    countCourses: number
    hasSchedule: boolean
    hasLives: boolean
    hasActiveSubscription: boolean
    profile: IProfile
}

export const GET_ME = gql`
    {
        me {
            id
            name
            profilePicture
            hasActiveSubscription
            countCourses
            hasSchedule
            hasLives
            profile {
                id
                graduationStep
                institutionIds
                specialtyIds
                testExperience
                preparatoryCourseStatus
                preparatoryCourseName
                objective
            }
        }
    }
`
