import ApolloClient from 'apollo-client'
import { events, IEvents } from 'Config/Segment'
import { GET_ME } from 'Apollo/User/Queries/me'

export const segmentTrack = async (
    client: ApolloClient<object>,
    eventName: IEvents,
    additionalAttributes: Object
) => {
    let data = {
        ...additionalAttributes,
        ...events[eventName].data
    }
    if (!additionalAttributes.hasOwnProperty('email')) {
        const {
            data: {
                me: { id: userId }
            },
            errors
        } = await client.query({ query: GET_ME })
        if (!!errors) {
            console.log('segmentTrack with ERROR:', errors)
            throw new Error()
        } else {
            data = {
                ...data,
                'User ID': userId
            }
        }
        console.log('eventName:', eventName, '- data:', data)
        window.analytics.track(events[eventName].event, data)
    }
}
