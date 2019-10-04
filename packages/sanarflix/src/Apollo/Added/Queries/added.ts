import gql from 'graphql-tag'

interface ITheme {
    id: string
    course: {
        id: string
    }
}

type ResourceType =
    | 'Book'
    | 'Course'
    | 'Content'
    | 'Question'
    | 'Quiz'
    | 'Video'
    | 'Document'
    | 'Download'

export interface ILastAddedContent {
    id: string
    title: string
    thumbnail: string
    resource_type: ResourceType
    theme: ITheme
    resource_id: string
}

export interface ILastAddedContentsPayload {
    lastAddedContents: {
        count: number
        data: ILastAddedContent[]
    }
}

export const GET_ADDED = gql`
    query LastAddedContents($type: Type, $limit: Int, $skip: Int) {
        lastAddedContents(type: $type, limit: $limit, skip: $skip) {
            count
            data {
                id
                title
                thumbnail
                resource_id
                resource_type
                theme {
                    id
                    course {
                        id
                    }
                }
            }
        }
    }
`
