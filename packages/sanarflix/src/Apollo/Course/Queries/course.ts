import gql from 'graphql-tag'

export type IType =
    | 'resume'
    | 'mentalmap'
    | 'flowchart'
    | 'article'
    | 'slide'
    | 'lesson'
    | 'question'

export interface INextContent {
    theme_title: string
    theme_id: string
    resource_id: string
    thumbnail: string
    resource_type: 'Document' | 'Video' | 'Question'
    type: IType
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
    progress_percentage: number
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
                progress_percentage
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
