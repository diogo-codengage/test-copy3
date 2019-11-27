import gql from 'graphql-tag'

export interface IMe {
    id: string
    name: string
    profilePicture: string
}

export const GET_ME = gql`
    {
        me {
            id
            name
            profilePicture
            hasActiveSubscription
        }
    }
`
