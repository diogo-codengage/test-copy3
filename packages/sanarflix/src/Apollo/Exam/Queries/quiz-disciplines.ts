import gql from 'graphql-tag'

export interface IDiscipline {
    value: string
    label: string
}

export interface IQuizDisciplinesQuery {
    quizDisciplines: {
        data: IDiscipline[]
    }
}

export interface IQuizDisciplinesVariables {
    medUniversityId: string
}

export const GET_QUIZ_DISCIPLINES = gql`
    query QuizDisciplines($medUniversityId: ID) {
        quizDisciplines(medUniversityId: $medUniversityId) {
            data {
                value: id
                label: name
            }
        }
    }
`
