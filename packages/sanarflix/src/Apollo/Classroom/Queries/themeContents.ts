import gql from 'graphql-tag'

export interface ITheme {
    id: string
    title: string
    resource_type: string
    resource_id: string
    completed: boolean
    index: number
    type: string
    document: {
        id: string
        title: string
    }
    video: {
        id: string
        title: string
    }
    quiz: {
        id: string
        title: string
    }
}

export interface IThemeContents {
    data: ITheme[]
}

export const GET_THEME_CONTENTS = gql`
    query ThemeContents($themeId: ID!) {
        themeContents(themeId: $themeId) {
            data {
                id
                title
                resource_type
                resource_id
                completed
                index
                type
                document {
                    id
                    title
                }
                video {
                    id
                    title
                }
                quiz {
                    title
                    id
                }
            }
        }
    }
`
