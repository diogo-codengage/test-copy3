import gql from 'graphql-tag'

export const GET_BOARDS = gql`
    query boards($order: String, $limit: Int) {
        boards(order: $order, limit: $limit) {
            data {
                value: id
                label: name
            }
        }
    }
`
