import gql from 'graphql-tag'

export const GET_TAGS = gql`
    query tags($order: String) {
        tags(order: $order) {
            data {
                value: id
                label: name
            }
        }
    }
`
