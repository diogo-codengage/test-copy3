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
    resource_type: 'Video' | 'Question' | 'Document'
    resource_id: string
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
    query ThemeContents($themeId: ID!, $courseId: ID!) {
        themeContents(themeId: $themeId, courseId: $courseId) {
            data {
                id
                index
                resource_type
                resource_id
                title
                type
                completed
            }
        }
    }
`
