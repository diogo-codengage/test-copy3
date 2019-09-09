import gql from 'graphql-tag'

export interface ITheme {
    id: string
    name: string
}

export interface IThemes {
    themes: {
        data: ITheme[]
        count: number
    }
}

export const GET_THEMES = gql`
    query Themes($courseId: ID!, $skip: Int, $completeness: CompletenessType) {
        themes(
            courseId: $courseId
            limit: 10
            skip: $skip
            completeness: $completeness
        ) {
            data {
                id
                name
                course {
                    id
                }
            }
            count
        }
    }
`
