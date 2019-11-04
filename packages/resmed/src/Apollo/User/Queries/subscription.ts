import gql from 'graphql-tag'

interface ICourse {
    id: string
    name: string
    description: string
    status: 'active' | 'inactive'
    progress: number
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
                specialties {
                    id
                    name
                }
            }
        }
    }
`
