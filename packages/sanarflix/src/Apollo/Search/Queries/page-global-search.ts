import gql from 'graphql-tag'

export type IType =
    | 'resume'
    | 'mentalmap'
    | 'flowchart'
    | 'article'
    | 'lesson'
    | 'question'

export type IResourceType =
    | 'Book'
    | 'Course'
    | 'Content'
    | 'Question'
    | 'Quiz'
    | 'Video'
    | 'Document'
    | 'Download'

interface IOwner {
    id: string
}

export interface ISearch {
    id: string
    title: string
    resource_type: IResourceType
    resource_id: string
    type: IType
    course: IOwner
    theme: IOwner
}

export interface IGlobalSearch {
    globalSearch: {
        data: ISearch[]
        count: number
    }
}

export const GET_GLOBAL_SEARCH = gql`
    query GlobalSearch($value: String!, $limit: Int, $skip: Int, $type: Type) {
        globalSearch(value: $value, limit: $limit, skip: $skip, type: $type) {
            count
            data {
                resource_title
                resource_id
                resource_type
                type
                theme {
                    id
                }
                course {
                    id
                }
            }
        }
    }
`
