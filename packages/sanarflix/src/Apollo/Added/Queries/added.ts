import gql from 'graphql-tag'

export interface ILastAddedContents {
    title: string
    thumbnail: string
}

export interface ILastAddedContentsPayload {
    lastAddedContents: {
        count: number
        data: ILastAddedContents[]
    }
}

export const GET_ADDED = gql`
    query LastAddedContents($type: Type, $limit: Int, $skip: Int) {
        lastAddedContents(type: $type, limit: $limit, skip: $skip) {
            count
            data {
                title
                thumbnail
            }
        }
    }
`
