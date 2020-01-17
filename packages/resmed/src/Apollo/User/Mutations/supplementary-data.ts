import gql from 'graphql-tag'

import { IMe } from '../Queries/me'

export interface ISuplemmentaryMutation extends IMe {}

export interface ISuplemmentaryOptions {
    medUniversityId: string
    ingressYear: string
    ingressSemester: string
    hasPreviousResidencyExam: 'none' | 'one' | 'many'
    previousResidencyCourseId: string
    examIntentionCategoryId: string
    medProfissionalSpecialtyIds: string[]
    medInstitutionIds: string[]
}

export interface ISuplemmentaryVariables {
    data: ISuplemmentaryOptions
}

export const SUPPLEMENTARY_DATA = gql`
    mutation SupplementaryData($data: SupplementaryDataInput!) {
        supplementaryData(data: $data) {
            id
            name
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
