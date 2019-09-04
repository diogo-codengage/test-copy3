import gql from 'graphql-tag'

interface ICourse {
    knowledge_area: string | null
    name: string | null
    progress_percentage: number | null
}

export interface ITheme {
    id: string
    title: string
    resource_type: string
    resource_id: string
    completed: boolean
    index: number
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
    }
}

export interface IThemeContents {
    data: ITheme
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
                document {
                    id
                    title
                }
                video {
                    id
                    title
                }
                quiz {
                    id
                    title
                }
            }
        }
    }
`
