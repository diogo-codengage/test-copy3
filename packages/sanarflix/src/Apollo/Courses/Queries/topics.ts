import gql from 'graphql-tag'

export interface ITopic {
    id: string
    name: string
}

export interface ITopics {
    topics: {
        data: ITopic[]
    }
}

export const GET_TOPICS = gql`
    {
        topics {
            data {
                id
                name
            }
        }
    }
`
