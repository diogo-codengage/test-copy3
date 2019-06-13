import gql from 'graphql-tag'

export const GET_TAGS = gql`
    query {
        tags {
            data {
                value: id
                label: name
            }
        }
    }
`
