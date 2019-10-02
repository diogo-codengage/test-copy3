import gql from 'graphql-tag'

export type IType =
    | 'resume'
    | 'mentalmap'
    | 'flowchart'
    | 'article'
    | 'lesson'
    | 'question'

export interface IContentType {
    description: string
    resourceType:
        | 'Book'
        | 'Course'
        | 'Content'
        | 'Question'
        | 'Quiz'
        | 'Video'
        | 'Document'
        | 'Download'
    type: IType
}

export interface IContentTypePayload {
    contentTypes: IContentType[]
}

export const GET_CONTENT_TYPES = gql`
    query ContentTypes {
        contentTypes {
            description
            resourceType
            type
        }
    }
`
