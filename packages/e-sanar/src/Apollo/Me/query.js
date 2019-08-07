import gql from 'graphql-tag'

export const GET_ME = gql`
    {
        me {
            id
            name
            email
            profile_picture
            enrollments {
                id
                expires_at
                thumbnail
                progress_percentage
                course {
                    id
                    icon
                    name
                }
            }
        }
    }
`
