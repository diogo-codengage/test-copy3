import gql from 'graphql-tag'

export interface ICourse {
    id: string
    name: string
    cover_picture_url: string
}

export interface ICourses {
    courses: {
        data: ICourse[]
        count: number
    }
}

export type ICompletenessType = 'completed' | 'incompleted' | undefined

export const GET_COURSES = gql`
    query Courses($skip: Int, $tagId: ID, $completeness: CompletenessType) {
        courses(
            limit: 20
            skip: $skip
            order: alphabetical
            tagId: $tagId
            completeness: $completeness
        ) {
            data {
                id
                name
                cover_picture_url
            }
            count
        }
    }
`
