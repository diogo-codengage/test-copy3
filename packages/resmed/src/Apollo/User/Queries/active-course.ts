import gql from 'graphql-tag'

export interface ICourse {
    id: string | undefined
    name: string | undefined
    progress: number
    infos?: IInfo[]
    accessed: boolean
    expireDate: string
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
            expireDate
            accessed
        }
    }
`
