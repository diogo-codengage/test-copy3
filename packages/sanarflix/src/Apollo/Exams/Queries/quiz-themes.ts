import gql from 'graphql-tag'

export interface ITheme {
    value: string
    label: string
}

export interface IQuizThemesQuery {
    quizThemes: {
        data: ITheme[]
    }
}

export interface IQuizIThemesVariables {
    medUniversityId: string
    disciplineIds: string[]
}

export const GET_QUIZ_THEMES = gql`
    query QuizThemes($medUniversityId: ID, $disciplineIds: [ID]) {
        quizThemes(
            medUniversityId: $medUniversityId
            disciplineIds: $disciplineIds
        ) {
            data {
                value: id
                label: name
            }
        }
    }
`
