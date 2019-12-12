import gql from 'graphql-tag'

export interface ILesson {
    value: string
    label: string
}

export interface ILessonsQuery {
    lessons: ILesson[]
}

export const GET_LESSONS = gql`
    query Lessons {
        lessons(where: { status: active }) {
            value: id
            label: name
        }
    }
`
