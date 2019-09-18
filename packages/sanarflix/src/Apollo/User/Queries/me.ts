import gql from 'graphql-tag'

export interface IMe {
    id: string
    name: string
    profile_picture: string
}

export const GET_ME = gql`
    {
        me {
            id
            name
            profile_picture
        }
    }
`
