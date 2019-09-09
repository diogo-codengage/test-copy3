import gql from 'graphql-tag'

export type IType =
    | 'resume'
    | 'mentalmap'
    | 'flowchart'
    | 'article'
    | 'slide'
    | 'lesson'
    | 'question'

export interface ILastAccessed {
    theme_title: string
    theme_id: string
    resource_id: string
    thumbnail: string
    resource_type: 'Document' | 'Video' | 'Question'
    type: IType
}

export const GET_LAST_ACCESSED = gql`
    query GetLastAcessed($courseId: ID) {
        lastAccessed(courseId: $courseId) {
            theme_title
            thumbnail
            resource_type
            resource_id
            type
            theme_id
        }
    }
`
