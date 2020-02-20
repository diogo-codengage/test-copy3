import React, { useContext, createContext, memo } from 'react'

import { withRouter, RouteComponentProps } from 'react-router'
import { useQuery } from '@apollo/react-hooks'

import RMSplashLoader from 'Components/SplashLoader'

import { eventsTrack } from 'Config/Trackers/track'
import { IEvents, IOptions } from 'Config/Trackers'
import { useAuthContext } from 'Hooks/auth'
import {
    GET_ACTIVE_COURSE,
    IActiveCourseQuery
} from 'Apollo/User/Queries/active-course'

interface RMMainContext {
    handleTrack: (event: IEvents, attrs?: IOptions) => void
    errorLoadActiveCourse: boolean
}

const Context = createContext<RMMainContext>({} as RMMainContext)

export const useMainContext = () => useContext(Context)

const RMMainProvider = memo<RouteComponentProps>(({ children }) => {
    const { loading, error, networkStatus } = useQuery<IActiveCourseQuery>(
        GET_ACTIVE_COURSE,
        {
            notifyOnNetworkStatusChange: true,
            onCompleted(response) {
                if (!!response && !!response.activeCourse)
                    setActiveCourse(response.activeCourse)
            }
        }
    )

    const { setActiveCourse, me, activeCourse } = useAuthContext()

    const handleTrack = (event: IEvents, attrs?: IOptions) => {
        const data = {
            'User ID': !!me && me.id,
            'Plataform ID': process.env.REACT_APP_PLATFORM_ID,
            'Course ID': !!activeCourse && activeCourse.id,
            ...attrs
        }
        eventsTrack(event, data)
    }

    if (loading) return <RMSplashLoader />

    const value = {
        handleTrack,
        errorLoadActiveCourse: !!error || networkStatus === 8
    }

    return <Context.Provider value={value}>{children}</Context.Provider>
})

export default withRouter(RMMainProvider)
