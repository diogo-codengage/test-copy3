import React, { createContext, useState, useContext } from 'react'

import { IMe } from 'Apollo/User/Queries/me'
import { ICourse } from 'Apollo/User/Queries/active-course'

export interface IMeAuth extends IMe {
    hasActiveSubscription
}

type RMAuthContextValues = {
    me: IMeAuth
    setMe: React.Dispatch<React.SetStateAction<IMeAuth | undefined>>
    activeCourse: ICourse
    setActiveCourse: React.Dispatch<React.SetStateAction<ICourse>>
}

const FLXAuthContext = createContext<RMAuthContextValues>(
    {} as RMAuthContextValues
)

export const useAuthContext = () => useContext(FLXAuthContext)

const initialCourse: ICourse = {
    id: '',
    name: '',
    progress: 0,
    infos: []
}

export const RMAuthProvider: React.FC = ({ children }) => {
    const [me, setMe] = useState()
    const [activeCourse, setActiveCourse] = useState(initialCourse)

    const value = {
        me,
        setMe,
        setActiveCourse,
        activeCourse
    }

    return (
        <FLXAuthContext.Provider value={value}>
            {children}
        </FLXAuthContext.Provider>
    )
}
