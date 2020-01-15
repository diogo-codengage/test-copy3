import gql from 'graphql-tag'

import { IMessage } from '../Queries/live-messages'

export interface ILiveChatSubscription {
    liveChat: IMessage
}

export interface ILiveChatVariables {
    liveId?: string
}

export const SUBSCRIPTION_LIVE_CHAT = gql`
    subscription CiveChat($liveId: ID!) {
        liveChat(where: { liveId: $liveId }) {
            id
            message
            name: userName
            image: userImage
            time: sendDate
        }
    }
`
