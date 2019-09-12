import gql from 'graphql-tag'

export interface ISearch {
}

export const GET_GLOBAL_SEARCH = gql`
    query GlobalSearch($skip: Int, $limit: Int, $value: String!) {
        globalSearch(
            limit: $limit
            skip: $skip
            value: $value
        ) {
            data {
                title: resource_title
                id: resource_id
                resource_type
                course {
                    id
                }
                theme {
                    id
                }
            }
        }
    }
`
