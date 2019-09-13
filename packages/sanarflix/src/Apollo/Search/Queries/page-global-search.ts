import gql from 'graphql-tag'

export const GET_GLOBAL_SEARCH = gql`
    query GlobalSearch($value: String!, $limit: Int, $skip: Int, $type: Type) {
        globalSearch(value: $value, limit: $limit, skip: $skip, type: $type) {
            count
            data {
                resource_title
                resource_id
                resource_type
                type
                theme {
                    id
                }
                course {
                    id
                }
            }
        }
    }
`
