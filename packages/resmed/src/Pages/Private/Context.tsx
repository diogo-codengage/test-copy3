import React, { useContext, createContext, useEffect } from 'react'

import { withRouter, RouteComponentProps } from 'react-router'
import { useApolloClient } from '@apollo/react-hooks'
import { useTranslation } from 'react-i18next'

import { useSnackbarContext } from '@sanar/components'

import { useAuthContext } from 'Hooks/auth'
import { GET_ACTIVE_COURSE } from 'Apollo/User/Queries/active-course'

interface RMMainContext {
    getCurrentEnrollment: () => void
}

const Context = createContext<RMMainContext>({} as RMMainContext)

export const useLayoutContext = () => useContext(Context)

const RMMainProvider: React.FC<RouteComponentProps> = ({ children }) => {
    const client = useApolloClient()
    const createSnackbar = useSnackbarContext()
    const { t } = useTranslation('resmed')
    const { setActiveCourse } = useAuthContext()

    const getCurrentEnrollment = async () => {
        try {
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
    }

    useEffect(() => {
        getCurrentEnrollment()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const value = {
        getCurrentEnrollment
    }

    return <Context.Provider value={value}>{children}</Context.Provider>
}

export default withRouter(RMMainProvider)
