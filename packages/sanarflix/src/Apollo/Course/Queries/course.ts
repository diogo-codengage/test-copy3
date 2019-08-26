import gql from 'graphql-tag'

export interface ICourse {
    id: string
    name: string
    description: string
    certificatesCount: number | null
    lessionsCount: number | null
    resoumesCount: number | null
    questionsCount: number | null
    mentalMapCount: number | null
    fluxogramsCount: number | null
    articlesGuidelinesCount: number | null
}

export interface ICourses {
    courses: {
        data: ICourse[]
    }
}

export const GET_COURSE = gql`
    query Courses($id: ID) {
        courses(id: $id, order: alphabetical) {
            data {
                id
                name
                certificatesCount
                lessionsCount
                resoumesCount
                questionsCount
                mentalMapCount
                fluxogramsCount
                articlesGuidelinesCount
                description
            }
        }
    }
`
