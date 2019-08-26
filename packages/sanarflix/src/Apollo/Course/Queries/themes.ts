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
    query Themes($courseId: ID!, $skip: Int) {
        themes(courseId: $courseId, limit: 20, skip: $skip) {
            data {
                id
                name
            }
            count
        }
    }
`
