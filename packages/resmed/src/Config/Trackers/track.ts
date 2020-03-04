import { events, IEvents } from 'Config/Trackers'
import ReactGA from 'react-ga'

export const eventsTrack = (eventName: IEvents, additionalAttributes?: Object) => {
    const data = {
        ...additionalAttributes,
        ...events[eventName].data
    }
    window.analytics.track(events[eventName].event, data)
    if (eventName === 'Page Viewed') {
        ReactGA.set({ page: additionalAttributes!['Source URL'] })
        ReactGA.pageview(additionalAttributes!['Source URL'])
    } else {
        ReactGA.event({
            category: data['Category'],
            action: eventName
        })
    }
}
