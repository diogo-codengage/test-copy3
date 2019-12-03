import { events, IEvents } from 'Config/Segment'

export const segmentTrack = (
    eventName: IEvents,
    additionalAttributes?: Object
) => {
    const data = {
        ...additionalAttributes,
        ...events[eventName].data
    }
    window.analytics.track(events[eventName].event, data)
}
