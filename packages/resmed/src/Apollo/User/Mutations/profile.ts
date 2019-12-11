import gql from 'graphql-tag'

export const CREATE_PROFILE_MUTATION = gql`
    mutation CreateProfile(
        $data: UserCreateProfileInput!
    ) {
        createProfile(data: $data) {
            id
            name
            profile {
                id
                graduationStep
                institutionIds
                specialtyIds
                testExperience
                preparatoryCourseStatus
                preparatoryCourseName
            }
        }
    }
`

export const UPDATE_PROFILE_MUTATION = gql`
    mutation UpdateProfile(
        $data: UserUpdateProfileInput!
    ) {
        updateProfile(data: $data) {
            id
            name
            profile {
                id
                graduationStep
                institutionIds
                specialtyIds
                testExperience
                preparatoryCourseStatus
                preparatoryCourseName
            }
        }
    }
`
