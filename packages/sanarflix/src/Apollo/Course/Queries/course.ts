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

export interface INextContent extends ILastAccessed {
    last_content: boolean
}

export interface ICourseCounters {
    questions: number | null
    certificates: number | null
    lessons: number | null
    resumes: number | null
    mentalmaps: number | null
    flowcharts: number | null
    articles: number | null
}

export interface ICourse {
    id: string
    name: string
    description: string
    lastAccessed: ILastAccessed
    nextContent: INextContent
    counters: ICourseCounters
}

export interface ICourses {
    courses: {
        data: ICourse[]
    }
}

export const GET_COURSE = gql`
    query Courses($id: ID) {
        courses(id: $id, order: alphabetical) {
            data {
                id
                name
                description
                lastAccessed {
                    theme_title
                    thumbnail
                    resource_type
                    resource_id
                    type
                    theme_id
                }
                nextContent {
                    theme_title
                    thumbnail
                    resource_type
                    resource_id
                    type
                    theme_id
                }
                counters {
                    questions
                    certificates
                    lessons
                    resumes
                    mentalmaps
                    flowcharts
                    articles
                }
            }
        }
    }
`
