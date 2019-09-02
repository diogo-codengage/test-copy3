import gql from 'graphql-tag'

interface ICourse {
    id: string
    knowledge_area: string
    name: string
    progress_percentage: string
}

export interface IThemes {
    data: {
        id: string
        name: string
        progress: {
            done: number
            total: number
            status: 'high' | 'medium' | 'low'
        }
        course: ICourse
    }
}

export const GET_THEMES = gql`
    query Themes($courseId: ID!) {
        themes(courseId: $courseId) {
            data {
                id
                name
                course {
                    name
                    knowledge_area
                    progress_percentage
                }
            }
        }
    }
`
