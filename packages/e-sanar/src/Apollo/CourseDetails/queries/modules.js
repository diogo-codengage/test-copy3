import gql from 'graphql-tag'

export const GET_MODULES = gql`
    query {
        modules {
            data {
                id
                name
                slug
                index
                durantion
                cover_picture
                progress {
                    done
                    total
                    status
                }
            }
            count
        }
    }
`
