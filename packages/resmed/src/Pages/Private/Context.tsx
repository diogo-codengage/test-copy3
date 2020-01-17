import React, { useContext, createContext, memo } from 'react'

import { withRouter, RouteComponentProps } from 'react-router'
import { useQuery } from '@apollo/react-hooks'

import RMSplashLoader from 'Components/SplashLoader'

import { segmentTrack } from 'Config/Segment/track'
import { IEvents, IOptions } from 'Config/Segment'
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
    const { loading, error } = useQuery<IActiveCourseQuery>(GET_ACTIVE_COURSE, {
        onCompleted({ activeCourse }) {
            setActiveCourse(activeCourse)
        }
    })

    const { setActiveCourse, me, activeCourse } = useAuthContext()

    const handleTrack = (event: IEvents, attrs?: IOptions) => {
        const data = {
            'User ID': me.id,
            'Plataform ID': process.env.REACT_APP_PLATFORM_ID,
            'Course ID': activeCourse.id,
            ...attrs
        }

        segmentTrack(event, data)
    }

    if (loading) return <RMSplashLoader />

    const value = {
        handleTrack,
        errorLoadActiveCourse: !!error
    }

    return <Context.Provider value={value}>{children}</Context.Provider>
})

export default withRouter(RMMainProvider)
