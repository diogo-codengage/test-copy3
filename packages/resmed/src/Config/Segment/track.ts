import { events, IEvents } from 'Config/Segment'

export const segmentTrack = async (
  eventName: IEvents,
  additionalAttributes: Object
) => {
  let data = {
    ...additionalAttributes,
    ...events[eventName].data
  }
  console.log('eventName:', eventName, '- data:', data)
  window.analytics.track(events[eventName].event, data)
}
