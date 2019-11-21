import gql from 'graphql-tag'

interface IQuestion {}

interface ISpecialty {
    id: string
    name: string
}

export interface IQuiz {
    id: string
    title: string
    specialty: ISpecialty
    questions: IQuestion[]
}

export interface IQuizQuery {
    quiz: IQuiz
}

export const GET_QUIZ = gql`
    query Quiz($id: ID!) {
        quiz(where: { id: $id }) {
            id
            title
            specialty {
                id
                name
            }
            questions {
                id
            }
        }
    }
`
