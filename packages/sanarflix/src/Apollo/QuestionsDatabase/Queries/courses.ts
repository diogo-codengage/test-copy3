import gql from 'graphql-tag'

export interface ICourse {
    value: string
    label: string
}

export interface ICourses {
    courses: {
        count: number
        data: ICourse[]
    }
}

export const GET_COURSES = gql`
    query Courses($skip: Int) {
        courses(order: alphabetical, skip: $skip ) {
            count
            data {
                value: id
                label: name
            }
        }
    }
`
