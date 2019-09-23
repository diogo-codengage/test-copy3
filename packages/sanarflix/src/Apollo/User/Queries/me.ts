import gql from 'graphql-tag'

export interface IMe {
    id: string
    name: string
    profile_picture: string
    email: string
}

export const GET_ME = gql`
    {
        me {
            id
            name
            email
            profile_picture
        }
    }
`
