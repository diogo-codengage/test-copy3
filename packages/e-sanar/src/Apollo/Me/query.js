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
                progress_percentage
                course {
                    id
                    icon
                    name
                    cover_picture_url
                }
            }
        }
    }
`
