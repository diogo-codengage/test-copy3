import gql from 'graphql-tag'
export interface IVideo {
    id: string
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
            source
            image
            progress
            timeInSeconds
        }
    }
`
