import React, { useContext, createContext, useState, useRef } from 'react'

interface IStats {
    correct: number
    wrong: number
    skipped: number
    total: number
    time: number
}

interface IFLXClassroomQuizProviderValue {
    setQuestions: (any) => void
    questions: any[]
    stopwatchRef: any
    setStats: React.Dispatch<React.SetStateAction<IStats>>
    stats: IStats
}

const Context = createContext<IFLXClassroomQuizProviderValue>({} as any)
export const useClassroomQuizContext = () => useContext(Context)

const FLXClassroomQuizProvider: React.FC = ({ children }) => {
    const stopwatchRef = useRef()
    const [questions, setQuestions] = useState<any[]>([])
    const [stats, setStats] = useState<IStats>({
        correct: 0,
        wrong: 0,
        skipped: 0,
        total: 0,
        time: 0
    })

    const value: IFLXClassroomQuizProviderValue = {
        questions,
        setQuestions,
        stopwatchRef,
        setStats,
        stats
    }

    return <Context.Provider value={value}>{children}</Context.Provider>
}

export const withClassroomProvider = Component => props => (
    <FLXClassroomQuizProvider>
        <Component {...props} />
    </FLXClassroomQuizProvider>
)

export default FLXClassroomQuizProvider
