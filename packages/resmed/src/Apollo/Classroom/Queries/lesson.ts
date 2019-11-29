import gql from 'graphql-tag'

interface ISpecialty {
    id: string
    name: string
}

interface ISubSpecialty {
    id: string
    specialty: ISpecialty
}

export interface ILesson {
    id: string
    title: string
    subSpecialty: ISubSpecialty
}

export interface ILessonQuery {
    lesson: ILesson
}

export const GET_LESSON = gql`
    query Lesson($id: ID!) {
        lesson(where: { id: $id }) {
            id
            title: name
            completed
            subSpecialty {
                id
                specialty {
                    id
                    name
                }
            }
        }
    }
`
