import React, {
    useContext,
    createContext,
    useState,
    useRef,
    useEffect
} from 'react'

interface IStats {
    correct: number
    wrong: number
    skipped: number
    total: number
    time: string
}

interface IFLXClassroomQuizProviderValue {
    setQuestions: (any) => void
    questions: any[]
    stopwatchRef: any
    setStats: React.Dispatch<React.SetStateAction<IStats>>
    stats: IStats
    setQuestionsMap: React.Dispatch<React.SetStateAction<any[]>>
    questionsMap: any[]
}

const Context = createContext<IFLXClassroomQuizProviderValue>({} as any)
export const useClassroomQuizContext = () => useContext(Context)

export const initialStats = {
    correct: 0,
    wrong: 0,
    skipped: 0,
    total: 0,
    time: '00:00:00'
}

const FLXClassroomQuizProvider: React.FC = ({ children }) => {
    const stopwatchRef = useRef()
    const [questions, setQuestions] = useState<any[]>([])
    const [questionsMap, setQuestionsMap] = useState<any[]>([])
    const [stats, setStats] = useState<IStats>(initialStats)

    useEffect(() => {
        setQuestionsMap(questions)
        setStats(old => ({
            ...old,
            total: questions.length
        }))
    }, [questions])

    const value: IFLXClassroomQuizProviderValue = {
        questions,
        setQuestions,
        stopwatchRef,
        setStats,
        stats,
        setQuestionsMap,
        questionsMap
    }

    return <Context.Provider value={value}>{children}</Context.Provider>
}

export const withClassroomProvider = Component => props => (
    <FLXClassroomQuizProvider>
        <Component {...props} />
    </FLXClassroomQuizProvider>
)

export default FLXClassroomQuizProvider
