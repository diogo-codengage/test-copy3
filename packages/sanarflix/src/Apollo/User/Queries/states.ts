import gql from 'graphql-tag'

export interface IState {
    id: string
    name: string
    initials: string
}

export const GET_STATES = gql`
    {
        states {
            data {
                id
                name
                initials
            }
        }
    }
`
