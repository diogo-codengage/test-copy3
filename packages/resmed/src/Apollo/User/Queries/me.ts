import gql from 'graphql-tag'

export interface IMedProfile {
    id: string
    examIntentionCategoryId: string
    previousResidencyCourse: IOwner
    hasPreviousResidencyExam: 'none' | 'one' | 'many'
}

export interface IOwner {
    id: string
    name: string
}

export interface IUserMedUniversity {
    id: string
    medUniversity: IOwner
    ingressYear: string
    ingressSemester: string
}

export interface IUserMedInstitution {
    id: string
    medInstitution: IOwner
}

export interface IUserMedSpecialtyIntention {
    id
    medProfessionalSpecialty: IOwner
}

export interface IMe {
    id: string
    name: string
    email: string
    profilePicture: string
    countCourses: number
    hasSchedule: boolean
    hasLives: boolean
    hasActiveSubscription: boolean
    medProfile: IMedProfile
    userMedUniversity: IUserMedUniversity
    userMedInstitutions: IUserMedInstitution[]
    userMedSpecialtyIntentions: IUserMedSpecialtyIntention[]
}

export const GET_ME = gql`
    {
        me {
            id
            name
            email
            profilePicture
            hasActiveSubscription
            hasSchedule
            hasLives
            countCourses
            medProfile {
                id
                examIntentionCategoryId
                previousResidencyCourse {
                    id
                    name
                }
                hasPreviousResidencyExam
            }
            userMedUniversity {
                id
                medUniversity {
                    id
                    name
                }
                ingressYear
                ingressSemester
            }
            userMedInstitutions {
                id
                medInstitution {
                    id
                    name
                }
            }
            userMedSpecialtyIntentions {
                id
                medProfessionalSpecialty {
                    id
                    name
                }
            }
        }
    }
`
