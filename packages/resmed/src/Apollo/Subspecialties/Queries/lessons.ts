import gql from 'graphql-tag'

export interface ILesson {
    id: string
    name: string
}

export const GET_LESSONS = gql`
    query Lessons($parentId: ID!) {
        lessons(where: { parentId: $parentId }) {
            id
            name
        }
    }
`
