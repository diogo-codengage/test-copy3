import gql from 'graphql-tag'

export interface IMe {
    id: string
    name: string
}

export const GET_ME = gql`
    {
        me {
            id
            name
        }
    }
`
