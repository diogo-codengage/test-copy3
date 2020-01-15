import gql from 'graphql-tag'

export interface IMessage {
    id: string
    message: string
    name: string
    image: string
    time: string
}

export interface ILiveMessagesQuery {
    liveMessages: {
        totalCount: Number
        items: IMessage[]
    }
}

export interface ILiveMessagesVariables {
    limit?: Number
    skip?: Number
    liveId?: string
}

export const GET_LIVE_MESSAGES = gql`
    query LiveMessages($limit: Int, $skip: Int, $liveId: ID!) {
        liveMessages(
            order: DESC
            limit: $limit
            skip: $skip
            where: { liveId: $liveId }
        ) {
            totalCount
            items {
                id
                message
                name: userName
                image: userImage
                time: sendDate
            }
        }
    }
`
