import gql from 'graphql-tag'

export const GET_BOARDS = gql`
    query {
        boards {
            data {
                value: id
                label: name
            }
        }
    }
`
