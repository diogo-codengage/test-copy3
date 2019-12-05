import gql from 'graphql-tag'

export interface ILesson {
    id: string
    title: string
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
        }
    }
`
