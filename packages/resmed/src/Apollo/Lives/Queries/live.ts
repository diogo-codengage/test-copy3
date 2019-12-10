import gql from 'graphql-tag'

import { ILive } from './lives'

export interface ILivesQuery {
    live: ILive
}

export const GET_LIVE = gql`
    query Live($id: ID) {
        live(where: { id: $id }) {
            id
            title
            description
            date
            youtubeId
            profressor: facilitedBy {
                id
                name
                profilePicture
            }
        }
    }
`
