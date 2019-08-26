import gql from 'graphql-tag'

export interface IThemeContent {
    id: string
    name: string
    certificatesCount: number | null
    lessionsCount: number | null
    resoumesCount: number | null
    questionsCount: number | null
    mentalMapCount: number | null
    fluxogramsCount: number | null
    articlesGuidelinesCount: number | null
    description: string
}

export interface IThemeContents {
    themeContents: {
        data: IThemeContent[]
    }
}

export const GET_THEME_CONTENTS = gql`
    query ThemeContents($themeId: ID!) {
        themeContents(themeId: $themeId) {
            id
        }
    }
`
