import React, { useContext, createContext, useState } from 'react'

interface IStateAction<T>
    extends React.Dispatch<React.SetStateAction<T | undefined>> {}

interface IFLXExamFilterProviderValue {
    setCurrentTab: React.Dispatch<React.SetStateAction<ITab>>
    currentTab: ITab
    setCollege: IStateAction<string>
    college?: string
    setSubject: IStateAction<string[]>
    subject?: string[]
    setTheme: IStateAction<string[]>
    theme?: string[]
    setSemester: IStateAction<string[]>
    semester?: string[]
    handleSubmit: () => void
}

const Context = createContext<IFLXExamFilterProviderValue>({} as any)
export const useClassroomContext = () => useContext(Context)

type ITab = 'college' | 'subject' | 'theme' | 'semester'

const FLXExamFilterProvider: React.FC = ({ children }) => {
    const [currentTab, setCurrentTab] = useState<ITab>('college')
    const [college, setCollege] = useState<string>()
    const [subject, setSubject] = useState<string[]>()
    const [theme, setTheme] = useState<string[]>()
    const [semester, setSemester] = useState<string[]>()

    const handleSubmit = () => {
        console.log({
            college,
            subject,
            theme,
            semester
        })
    }

    const value: IFLXExamFilterProviderValue = {
        setCurrentTab,
        currentTab,
        setCollege,
        college,
        setSubject,
        subject,
        setTheme,
        theme,
        setSemester,
        semester,
        handleSubmit
    }

    return <Context.Provider value={value}>{children}</Context.Provider>
}

export const withFLXExamFilterProvider = Component => props => (
    <FLXExamFilterProvider>
        <Component {...props} />
    </FLXExamFilterProvider>
)

export default FLXExamFilterProvider
