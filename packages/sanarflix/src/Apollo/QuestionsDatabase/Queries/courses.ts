import gql from 'graphql-tag'

export interface ICourse {
    value: string
    label: string
}

export interface ICourses {
    courses: {
        data: ICourse[]
    }
}

export const GET_COURSES = gql`
    query Courses {
        courses(order: alphabetical) {
            data {
                value: id
                label: name
            }
        }
    }
`
