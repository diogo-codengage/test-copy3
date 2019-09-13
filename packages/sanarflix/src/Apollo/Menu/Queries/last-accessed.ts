import gql from 'graphql-tag'

export type IType =
    | 'resume'
    | 'mentalmap'
    | 'flowchart'
    | 'article'
    | 'slide'
    | 'lesson'
    | 'question'

interface ICourse {
    id: string
    name: string
}

export interface ILastAccessed {
    theme_title: string
    theme_id: string
    resource_id: string
    course: ICourse
    content_name: string
    thumbnail: string
    resource_type: 'Document' | 'Video' | 'Question'
    type: IType
}

export interface ILastAccessedPayload {
    lastAccessed: ILastAccessed
}

export const GET_LAST_ACCESSED = gql`
    query GetLastAcessed {
        lastAccessed {
            theme_title
            thumbnail
            resource_type
            resource_id
            type
            theme_id
            course {
                id
                name
            }
            content_name
        }
    }
`
