import React, { useContext, createContext, useEffect } from 'react'

import { useApolloClient } from '@apollo/react-hooks'

import { useLayoutContext } from 'Pages/Private/Layout/Context'
import { CREATE_PROGRESS } from 'Apollo/Classroom/Mutations/create-progress'

interface IRMClassroomProviderValue {
    handleProgress: (data: IDataProgress) => void
}

interface IDataProgress {
    timeInSeconds: number
    percentage: number
    resourceId: string
}

const Context = createContext<IRMClassroomProviderValue>({} as any)
export const useClassroomContext = () => useContext(Context)

const RMClassroomProvider: React.FC = ({ children }) => {
    const client = useApolloClient()
    const { setMenuTab } = useLayoutContext()

    const handleProgress = async (data: IDataProgress) =>
        await client.mutate({
            mutation: CREATE_PROGRESS,
            variables: data
        })

    useEffect(() => {
        setMenuTab(2)
        return () => {
            setMenuTab(0)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const value: IRMClassroomProviderValue = {
        handleProgress
    }

    return <Context.Provider value={value}>{children}</Context.Provider>
}

export default RMClassroomProvider
