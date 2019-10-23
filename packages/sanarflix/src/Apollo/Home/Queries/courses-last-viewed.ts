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
    }
}

export const GET_COURSES_LAST_VIEWED = gql`
    {
        courses(order: viewed, limit: 50) {
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
        }
    }
`
