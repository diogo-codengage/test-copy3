import gql from 'graphql-tag'

export const GET_EXAMS = gql`
    query exams($order: String, $limit: Int) {
        exams(order: $order, limit: $limit) {
            data {
                value: id
                label: name
            }
        }
    }
`
