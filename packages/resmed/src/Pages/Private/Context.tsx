import React, {
    useContext,
    createContext,
    useEffect,
    useState,
    memo
} from 'react'

import { withRouter, RouteComponentProps } from 'react-router'
import { useApolloClient } from '@apollo/react-hooks'
import { useTranslation } from 'react-i18next'

import { useSnackbarContext } from '@sanar/components'

import { RMComplementaryRegisterModal } from 'Components/ComplementaryRegister'
import RMSplashLoader from 'Components/SplashLoader'

import { segmentTrack } from 'Config/Segment/track'
import { IEvents, IOptions } from 'Config/Segment'
import { useAuthContext } from 'Hooks/auth'
import { GET_ACTIVE_COURSE } from 'Apollo/User/Queries/active-course'

interface RMMainContext {
    getCurrentEnrollment: () => void
    handleTrack: (event: IEvents, attrs?: IOptions) => void
}

const Context = createContext<RMMainContext>({} as RMMainContext)

export const useMainContext = () => useContext(Context)

const RMMainProvider = memo<RouteComponentProps>(({ children }) => {
    const client = useApolloClient()
    const createSnackbar = useSnackbarContext()
    const { t } = useTranslation('resmed')
    const [loading, setLoading] = useState(true)
    const { setActiveCourse, me, activeCourse } = useAuthContext()

    const getCurrentEnrollment = async () => {
        try {
            setLoading(true)
            const {
                data: { activeCourse }
            } = await client.query({ query: GET_ACTIVE_COURSE })

            setActiveCourse(activeCourse)
        } catch {
            createSnackbar({
                message: t('main.errorLoadActiveCourse'),
                theme: 'error'
            })
        }
        setLoading(false)
    }

    const handleTrack = (event: IEvents, attrs?: IOptions) => {
        const data = {
            'User ID': me.id,
            'Plataform ID': process.env.REACT_APP_PLATFORM_ID,
            'Course ID': activeCourse.id,
            ...attrs
        }

        segmentTrack(event, data)
    }

    useEffect(() => {
        getCurrentEnrollment()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    if (loading) return <RMSplashLoader />

    if (!!me && !me.hasActiveSubscription) {
        return <RMComplementaryRegisterModal closable={false} />
    }

    const value = {
        getCurrentEnrollment,
        handleTrack
    }

    return <Context.Provider value={value}>{children}</Context.Provider>
})

export default withRouter(RMMainProvider)
