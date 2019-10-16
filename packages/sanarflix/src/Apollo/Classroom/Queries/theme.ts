import gql from 'graphql-tag'

export interface ITheme {
    id: string
    name: string
}

export const GET_THEME = gql`
    query Theme($id: ID!, $courseId: ID!) {
        theme(id: $id, courseId: $courseId) {
            id
            name
            progress_percentage
            course {
                id
                progress_percentage
            }
        }
    }
`
