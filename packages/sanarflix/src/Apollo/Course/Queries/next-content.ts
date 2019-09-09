import gql from 'graphql-tag'

export type IType =
    | 'resume'
    | 'mentalmap'
    | 'flowchart'
    | 'article'
    | 'slide'
    | 'lesson'
    | 'question'

export interface INextContent {
    theme_title: string
    theme_id: string
    resource_id: string
    thumbnail: string
    resource_type: 'Document' | 'Video' | 'Question'
    type: IType
}

export const GET_NEXT_CONTENT = gql`
    query GetNextContent($courseId: ID!) {
        nextContent(courseId: $courseId) {
            theme_title
            thumbnail
            resource_type
            resource_id
            type
            theme_id
        }
    }
`
