import gql from 'graphql-tag'

import { ILive } from './lives'

export interface ILiveQuery {
    live: ILive
}

export interface ILiveVariables {
    id: string
}

export const GET_LIVE = gql`
    query Live($id: ID) {
        live(where: { id: $id }) {
            id
            title
            description
            startDate
            endDate
            image
            youtubeId
            professor: facilitedBy {
                id
                name
                profilePicture
                academicTraining
            }
        }
    }
`
