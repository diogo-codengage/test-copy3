import gql from 'graphql-tag'

interface IProfile {
    id: string
    graduationStep: 'firstYear' | 'secondYear' | 'thirdYear' | 'fourthYear' | 'fifthYear' | 'sixthYear' | 'formed'
    institutionIds: string[]
    specialtyIds: number[]
    testExperience: 'none' | 'one' | 'many'
    preparatoryCourseStatus: 'inProgress' | 'completed' | 'missing'
    userId: string
    courseId?: string
}

export interface IMe {
    id: string
    name: string
    profilePicture: string
    hasActiveSubscription: boolean
    profile: IProfile | []
}

export const GET_ME = gql`
    {
        me {
            id
            name
            profilePicture
            hasActiveSubscription
            profile {
                id
            }
        }
    }
`
