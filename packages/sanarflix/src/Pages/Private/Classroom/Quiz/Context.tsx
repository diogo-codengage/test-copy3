import React, {
    useContext,
    createContext,
    useState,
    useRef,
    useEffect
} from 'react'

import useWindowSize from 'sanar-ui/dist/Hooks/useWindowSize'

import { useLayoutContext } from 'Pages/Layout/Context'

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
    pauseStopwatch: () => void
    startStopwatch: () => void
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
    const stopwatchRef = useRef<any>()
    const { width } = useWindowSize()
    const { setFooterProps } = useLayoutContext()
    const [questions, setQuestions] = useState<any[]>([])
    const [questionsMap, setQuestionsMap] = useState<any[]>([])
    const [stats, setStats] = useState<IStats>(initialStats)

    const pauseStopwatch = () => {
        if (stopwatchRef && stopwatchRef.current) {
            stopwatchRef.current.pause()
        }
    }

    const startStopwatch = () => {
        if (stopwatchRef && stopwatchRef.current) {
            stopwatchRef.current.start()
        }
    }

    useEffect(() => {
        setQuestionsMap(questions)
        setStats(old => ({
            ...old,
            total: questions.length
        }))
    }, [questions])

    useEffect(() => {
        if (width < 768) {
            setFooterProps({
                mb: 8
            })
        } else {
            setFooterProps({
                mb: 0
            })
        }
        return () =>
            setFooterProps({
                mb: 0
            })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [width])

    const value: IFLXClassroomQuizProviderValue = {
        questions,
        setQuestions,
        stopwatchRef,
        setStats,
        stats,
        setQuestionsMap,
        questionsMap,
        pauseStopwatch,
        startStopwatch
    }

    return <Context.Provider value={value}>{children}</Context.Provider>
}

export const withClassroomProvider = Component => props => (
    <FLXClassroomQuizProvider>
        <Component {...props} />
    </FLXClassroomQuizProvider>
)

export default FLXClassroomQuizProvider
