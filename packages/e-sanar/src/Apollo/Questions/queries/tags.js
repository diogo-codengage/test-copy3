import gql from 'graphql-tag'

export const GET_TAGS = gql`
    query tags($order: String, $limit: Int) {
        tags(order: $order, limit: $limit) {
            data {
                value: id
                label: name
            }
        }
    }
`
