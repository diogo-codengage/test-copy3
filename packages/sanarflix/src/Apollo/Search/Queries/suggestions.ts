import gql from 'graphql-tag'

export interface ISearch {
    title: string
}

export const GET_GLOBAL_SEARCH_SUGGESTIONS = gql`
    query suggestions($value: String!) {
        suggestions(title: $value) {
            data: result {
                title
            }
        }
    }
`
