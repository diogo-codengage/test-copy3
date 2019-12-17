import gql from 'graphql-tag'

import { ILive } from './lives'

export interface IActiveLiveQuery {
    activeLive: ILive
}

export const GET_ACTIVE_LIVE = gql`
    {
        activeLive {
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
