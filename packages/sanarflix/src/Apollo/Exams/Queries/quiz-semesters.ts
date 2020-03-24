import gql from 'graphql-tag'

export interface ISemester {
    value: string
    label: string
    semester: string
}

export interface IQuizISemestersQuery {
    quizSemesters: {
        data: ISemester[]
    }
}

export interface IQuizISemestersVariables {
    medUniversityId: string
    disciplineIds: string[]
    themeIds: string[]
}

export const GET_QUIZ_SEMESTERS = gql`
    query QuizSemesters(
        $medUniversityId: ID
        $disciplineIds: [ID]
        $themeIds: [ID]
    ) {
        quizSemesters(
            medUniversityId: $medUniversityId
            disciplineIds: $disciplineIds
            themeIds: $themeIds
        ) {
            data {
                label: year
                value: name
            }
        }
    }
`
