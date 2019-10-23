import gql from 'graphql-tag'

interface IPicture {
    small: {
        url: string
    }
}
export interface ICourse {
    id: string
    name: string
    progress_percentage: number
    cover_pictures: IPicture
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
                progress_percentage
                cover_pictures {
                    small {
                        url
                    }
                }
            }
            count
        }
    }
`
