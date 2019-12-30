import gql from 'graphql-tag'

interface ICourse {
    id: string
    name: string
    expireDate: string
    progress: number
    accessed: boolean
}

export interface ICourseQuery {
    courses: ICourse[]
}

export const GET_COURSES = gql`
    {
        courses {
            id
            name
            expireDate
            progress
            accessed
        }
    }
`
