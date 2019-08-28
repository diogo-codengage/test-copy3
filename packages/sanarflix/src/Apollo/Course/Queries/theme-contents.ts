import gql from 'graphql-tag'

export type IType =
    | 'resume'
    | 'mentalmap'
    | 'flowchart'
    | 'article'
    | 'lesson'
    | 'question'
export interface IThemeContent {
    id: string
    index: string
    resource_type: string
    title: string
    type: IType
    completed: boolean
}

export interface IThemeContents {
    themeContents: {
        data: IThemeContent[]
    }
}

export const GET_THEME_CONTENTS = gql`
    query ThemeContents($themeId: ID!) {
        themeContents(themeId: $themeId) {
            data {
                id
                index
                resource_type
                title
                type
                completed
            }
        }
    }
`
