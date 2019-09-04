import gql from 'graphql-tag'

export interface ICourse {
    id: string
    name: string
    cover_picture_url: string
    progress_percentage: number
}

export interface ICourses {
    courses: {
        data: ICourse[]
    }
}

export const GET_COURSES_LAST_VIEWED = gql`
    {
        courses(order: viewed, limit: 50) {
            data {
                id
                name
                cover_picture_url
                progress_percentage
            }
        }
    }
`