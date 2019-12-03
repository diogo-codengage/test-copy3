import gql from 'graphql-tag'
export interface IVideo {
    id: string
    title: string
    source: string
    image: string
    progress: number
    timeInSeconds: number
}

export interface IVideoQuery {
    video: IVideo
}

export const GET_VIDEO = gql`
    query Video($id: ID!) {
        video(where: { id: $id }) {
            id
            title
            source
            image
            progress
            timeInSeconds
        }
    }
`
