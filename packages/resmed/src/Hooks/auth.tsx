import React, { createContext, useState, useContext } from 'react'

import { IMe } from 'Apollo/User/Queries/me'
import { ICourse } from 'Apollo/User/Queries/active-course'

type RMAuthContextValues = {
    me: IMe
    setMe: React.Dispatch<React.SetStateAction<IMe | undefined>>
    activeCourse: ICourse
    setActiveCourse: React.Dispatch<React.SetStateAction<ICourse>>
}

const RMAuthContext = createContext<RMAuthContextValues>(
    {} as RMAuthContextValues
)

export const useAuthContext = () => useContext(RMAuthContext)

const initialCourse: ICourse = {
    id: '',
    name: '',
    progress: 0,
    infos: [],
    accessed: false,
    expireDate: '',
    startDate: '',
    images: {
        original: ''
    },
    lastAccessed: {
        specialtyId: '',
        subSpecialtyId: '',
        lesson: {
            id: '',
            name: '',
            index: 0
        },
        collectionId: '',
        resource: {
            id: '',
            type: 'Video',
            title: ''
        }
    }
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
        <RMAuthContext.Provider value={value}>
            {children}
        </RMAuthContext.Provider>
    )
}
