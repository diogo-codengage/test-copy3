import gql from 'graphql-tag'

import { IMessage } from '../Queries/live-messages'

export interface ISendMessageMutation {
    sendMessage: IMessage
}

export interface ISendMessageVariables {
    liveId: string
    message: string
}

export const SEND_MESSAGE = gql`
    mutation SendMessage($liveId: ID!, $message: String!) {
        sendMessage(data: { liveId: $liveId, message: $message }) {
            id
            message
            name: userName
            image: userImage
            time: sendDate
        }
    }
`
