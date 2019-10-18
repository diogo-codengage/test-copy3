import gql from 'graphql-tag'

export type IType =
    | 'mentalmap'
    | 'flowchart'
    | 'article'
    | 'lesson'
    | 'question'
    | 'resume'
    | 'video'
    | 'course'

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
    name: string
}

interface IPicture {
    small: {
        url: string
    }
}

export interface ISearch {
    resourceId: string
    resourceTitle: string
    resourceType: IResourceType
    totalPages: number
    timeInSeconds: number
    type: IType
    isNew: boolean
    course?: IOwner
    theme?: IOwner
    image?: IPicture
    professorName?: string
    totalThemes?: number
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
                resourceTitle: resource_title
                resourceId: resource_id
                resourceType: resource_type
                totalPages: total_pages
                timeInSeconds: time_in_seconds
                professorName: professor_name
                totalThemes: total_themes
                type
                isNew
                image: cover_pictures {
                    small {
                        url
                    }
                }
                theme {
                    id
                    name
                }
                course {
                    id
                    name
                }
            }
        }
    }
`
