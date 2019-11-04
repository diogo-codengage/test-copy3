import gql from 'graphql-tag'

export interface ISubscription {
    id: string
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
