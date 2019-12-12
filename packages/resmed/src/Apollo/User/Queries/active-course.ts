import gql from 'graphql-tag'

export interface ICourse {
    id: string | undefined
    name: string | undefined
    progress: number
    infos?: IInfo[]
    accessed: boolean
    progress_id: string | undefined
}

interface IInfo {
    title: string
    body: string
}

export const GET_ACTIVE_COURSE = gql`
    {
        activeCourse {
            id
            name
            progress
            infos {
                title
                body
            }
            accessed
            progress_id
        }
    }
`
