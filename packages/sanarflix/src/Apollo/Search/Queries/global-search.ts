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

export const GET_GLOBAL_SEARCH = gql`
    query GlobalSearch($skip: Int, $limit: Int, $value: String!) {
        globalSearch(limit: $limit, skip: $skip, value: $value) {
            data {
                title: resource_title
                id: resource_id
                resource_type
                type
                course {
                    id
                }
                theme {
                    id
                }
            }
        }
    }
`
