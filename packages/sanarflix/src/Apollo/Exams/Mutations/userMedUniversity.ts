import gql from 'graphql-tag'

export const SAVE_USER_MED_UNIVERSITY_MUTATION = gql`
    mutation SaveUserMedUniversity(
        $medUniversityId: [String]!
        $ingressYear: String!
        $ingressSemester: String!
        $methodology: String!
    ) {
        saveUserMedUniversity (input: {
            medUniversityId: $medUniversityId
            ingressSemester: $ingressSemester
            ingressYear: $ingressYear
            methodology: $methodology
        }) {
            medUniversity {
              id
              name
            }
            ingressSemester
            ingressYear
            methodology
        } 
    }
`