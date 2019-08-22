import gql from 'graphql-tag'

export interface ICourse {
    id: string
    name: string
    cover_picture_url: string
}

export interface ICourses {
    courses: {
        data: ICourse[]
    }
}

export const GET_COURSES_LAST_VIEWED = gql`
    {
        courses(order: viewed, limit: 20) {
            data {
                id
                name
                cover_picture_url
            }
        }
    }
`
