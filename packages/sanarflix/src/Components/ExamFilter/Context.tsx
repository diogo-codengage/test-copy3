import React, { useContext, createContext, useState } from 'react'

interface IFLXExamFilterProviderValue {
    setCurrentTab: React.Dispatch<React.SetStateAction<ITab>>
    currentTab: ITab
}

const Context = createContext<IFLXExamFilterProviderValue>({} as any)
export const useClassroomContext = () => useContext(Context)

type ITab = 'college' | 'subject' | 'theme' | 'semester'

const FLXExamFilterProvider: React.FC = ({ children }) => {
    const [currentTab, setCurrentTab] = useState<ITab>('semester')

    const value: IFLXExamFilterProviderValue = {
        setCurrentTab,
        currentTab
    }

    return <Context.Provider value={value}>{children}</Context.Provider>
}

export const withFLXExamFilterProvider = Component => props => (
    <FLXExamFilterProvider>
        <Component {...props} />
    </FLXExamFilterProvider>
)

export default FLXExamFilterProvider
