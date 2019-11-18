import React, { createContext, useState, useContext } from 'react'

import { IMe } from 'Apollo/User/Queries/me'
import { ICourse } from 'Apollo/User/Queries/active-course'

type RMAuthContextValues = {
    me: IMe
    setMe: React.Dispatch<React.SetStateAction<IMe | undefined>>
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
