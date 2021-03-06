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
    original: {
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
    themeId: string
    course?: IOwner
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
    query GlobalSearch($value: String!, $limit: Int, $skip: Int) {
        globalSearch(value: $value, limit: $limit, skip: $skip) {
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
                    original {
                        url
                    }
                }
                themeId: theme_id
                course {
                    id
                    name
                }
            }
        }
    }
`
