import React, { useContext, createContext, useState, memo } from 'react'

import { IEvent } from '@sanar/components/dist/Components/Organisms/BigCalendar'

import { IOption } from './Modal'

interface RMMainContext {
    modalSchedule: IModalState
    setModalSchedule: React.Dispatch<React.SetStateAction<IModalState>>
    schedule: ISchedule
    setSchedule: React.Dispatch<React.SetStateAction<ISchedule>>
}

const Context = createContext<RMMainContext>({} as RMMainContext)

export const useScheduleContext = () => useContext(Context)

interface IModalState {
    visible: boolean
    options: IOption | any
}

interface ISchedule {
    hasModified: boolean
    items: IEvent[]
    interval: {
        start: string
        end: string
    }
}

const RMScheduleProvider = memo(({ children }) => {
    const [modalSchedule, setModalSchedule] = useState<IModalState>({
        visible: false,
        options: {}
    })

    const [schedule, setSchedule] = useState<ISchedule>({
        hasModified: false,
        items: [],
        interval: {
            start: '',
            end: ''
        }
    })

    const value = {
        modalSchedule,
        setModalSchedule,
        schedule,
        setSchedule
    }

    return <Context.Provider value={value}>{children}</Context.Provider>
})

export const withScheduleContext = Component => props => (
    <RMScheduleProvider>
        <Component {...props} />
    </RMScheduleProvider>
)

export default RMScheduleProvider
