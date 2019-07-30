import gql from 'graphql-tag'

export const GET_EXAMS = gql`
    query exams($order: String) {
        exams(order: $order) {
            data {
                value: id
                label: name
            }
        }
    }
`
