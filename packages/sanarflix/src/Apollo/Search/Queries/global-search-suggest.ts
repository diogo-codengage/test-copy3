import gql from 'graphql-tag'

export interface ISearch {
    title: string
}

export const GET_GLOBAL_SEARCH_SUGGEST = gql`
    query globalSearch($skip: Int, $limit: Int, $value: String!) {
        globalSearch(limit: $limit, skip: $skip, value: $value) {
            data {
                title: resource_title
            }
        }
    }
`
