import gql from 'graphql-tag'

export interface ILesson {
    value: string
    label: string
}

export interface ILessonsQuery {
    lessons: ILesson[]
}

export const GET_LESSONS = gql`
    query Lessons($parentId: ID!) {
        lessons(where: { parentId: $parentId }) {
            value: id
            label: name
        }
    }
`
