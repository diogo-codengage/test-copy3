import gql from 'graphql-tag'

interface ILesson {
    id: string
    name: string
    completed: boolean
}

interface IVideo {
    id: string
    title: string
    image: string
    progress: number
}

export interface ICollection {
    id: string
    name: string
    lesson: ILesson
    content: {
        video: IVideo
    }
}

export interface ICollectionsQuery {
    collections: ICollection[]
}

export const GET_COLLECTIONS = gql`
    query Collections($parentId: ID!) {
        collections(where: { parentId: $parentId }) {
            id
            name
            lesson {
                id
                name
                completed
            }
            content {
                video {
                    id
                    title
                    image
                    progress
                }
                quiz {
                    id
                    title
                    questions {
                        id
                    }
                }
            }
        }
    }
`