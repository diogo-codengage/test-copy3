import gql from 'graphql-tag'

type Type =
    | 'resume'
    | 'mentalmap'
    | 'flowchart'
    | 'article'
    | 'lesson'
    | 'question'

type ResourceType =
    | 'Book'
    | 'Course'
    | 'Content'
    | 'Question'
    | 'Quiz'
    | 'Video'
    | 'Document'
    | 'Download'

interface Theme {
    id: string
    course: Course
}

interface Course {
    id: string
}

export interface IContent {
    id: string
    title: string
    thumbnail: string
    type: Type
    resource_type: ResourceType
    resource_id: string
    theme: Theme
}

export interface IContents {
    lastAddedContents: {
        data: IContent[]
    }
}

export const GET_CONTENTS_LAST_ADDED = gql`
    {
        lastAddedContents(limit: 50) {
            data {
                id
                title
                thumbnail
                type
                resource_type
                resource_id
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
