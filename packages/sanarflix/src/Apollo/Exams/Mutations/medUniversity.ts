import gql from 'graphql-tag'

export const SAVE_USER_MED_UNIVERSITY_MUTATION = gql`
    mutation SaveUserMedUniversity(
        $medUniversityId: String!
        $ingressSemester: String!
        $methodology: String!
    ) {
        saveUserMedUniversity (
            input: {
                medUniversityId: $medUniversityId
                ingressSemester: $ingressSemester
                methodology: $methodology
            }
        ) 
    }
`