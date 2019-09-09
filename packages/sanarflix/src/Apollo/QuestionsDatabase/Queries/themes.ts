import gql from 'graphql-tag'

export interface ITheme {
    value: string
    label: string
}

export interface IThemes {
    themes: {
        data: ITheme[]
    }
}

export const GET_THEMES = gql`
    query Themes($courseIds: [ID]!) {
        themes(courseIds: $courseIds) {
            data {
                value: id
                label: name
            }
        }
    }
`
