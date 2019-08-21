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

export const GET_COURSES_LAST_ADDED = gql`
    {
        courses(order: lastAdded, limit: 20) {
            data {
                id
                name
                cover_picture_url
            }
        }
    }
`
