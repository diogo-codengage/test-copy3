import React, { useContext, createContext, useEffect } from 'react'

import { useLayoutContext } from 'Pages/Private/Layout/Context'

interface IRMClassroomProviderValue {}

const Context = createContext<IRMClassroomProviderValue>({} as any)
export const useClassroomContext = () => useContext(Context)

const RMClassroomProvider: React.FC = ({ children }) => {
    const { setMenuTab } = useLayoutContext()

    useEffect(() => {
        setMenuTab(2)
        return () => {
            setMenuTab(0)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const value: IRMClassroomProviderValue = {}

    return <Context.Provider value={value}>{children}</Context.Provider>
}

export default RMClassroomProvider
