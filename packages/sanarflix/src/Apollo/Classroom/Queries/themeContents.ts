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
    question: {
        id: string
    }
    course: {
        id: string
        name: string
        knowledge_area: string
        progress_percentage: number
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
                question {
                    id
                }
                course {
                    id
                    name
                    knowledge_area
                    progress_percentage
                }
            }
        }
    }
`
