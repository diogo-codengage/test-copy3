import gql from 'graphql-tag'

interface ICourse {
    id: string
    name: string
    description: string
    status: 'active' | 'inactive'
    progress: number
    infos: IInfo[]
}

interface IInfo {
    title: string
    body: string
}
export interface ISubscription {
    id: string
    activeCourse: ICourse
}

export const GET_SUBSCRIPTION = gql`
    {
        subscription(where: { status: active }) {
            id
            activeCourse {
                id
                name
                description
                status
                progress
                infos {
                    title
                    body
                }
            }
        }
    }
`
