import gql from 'graphql-tag'

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
