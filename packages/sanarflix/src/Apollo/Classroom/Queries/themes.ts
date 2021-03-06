import gql from 'graphql-tag'

interface ICourse {
    id: string
    knowledge_area: string
    name: string
    index: number
    progress_percentage: string
}

export interface IThemes {
    count: number
    data: {
        id: string
        name: string
        progress_percentage
        progress: {
            done: number
            total: number
            status: 'high' | 'medium' | 'low'
        }
        course: ICourse
    }
}

export const GET_THEMES = gql`
    query Themes($courseIds: [ID]!) {
        themes(courseIds: $courseIds) {
            count
            data {
                id
                name
                index
                progress_percentage
                course {
                    id
                    name
                    progress_percentage
                }
            }
        }
    }
`
