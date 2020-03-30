import gql from 'graphql-tag'

interface IVideo {
    id: string
    title: string
    progress: number
}

interface IQuiz {
    id: string
    title: string
    progress: number
}

export interface ICollection {
    id: string
    name: string
    content: {
        video: IVideo
        quiz: IQuiz
    }
}

export interface ICollectionsQuery {
    collections: ICollection[]
}

export interface ICollectionsVariables {
    parentId: string
}

export const GET_COLLECTIONS = gql`
    query Collections($parentId: ID!) {
        collections(where: { parentId: $parentId }) {
            id
            name
            content {
                video {
                    id
                    title
                    progress
                }
                quiz {
                    id
                    title
                    progress
                }
            }
        }
    }
`
