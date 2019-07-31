import gql from 'graphql-tag'

export const GET_BOARDS = gql`
    query boards($order: String) {
        boards(order: $order) {
            data {
                value: id
                label: name
            }
        }
    }
`
