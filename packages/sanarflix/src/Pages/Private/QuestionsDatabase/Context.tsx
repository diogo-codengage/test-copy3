import React, {
    useContext,
    createContext,
    useState,
    useRef,
    useMemo,
    useCallback
} from 'react'

interface IFLXQuestionsProviderValue {}

const Context = createContext<any>({})
export const useQuestionsContext = () => useContext(Context)

interface IStats {
    correct: number
    wrong: number
    skipped: number
    total: number
    time: string
}

export const initialStats = {
    correct: 0,
    wrong: 0,
    skipped: 0,
    total: 0,
    time: '00:00:00'
}

const FLXQuestionsProvider: React.FC = ({ children }) => {
    const stopwatchRef = useRef<any>()
    const [currentIndex, setCurrentIndex] = useState(0)
    const [stats, setStats] = useState<IStats>(initialStats)
    const [filter, setFilter] = useState({
        selectedCourses: [],
        selectedThemes: []
    })

    const totalAnsweredQuestions = useMemo(
        () => stats.correct + stats.wrong + stats.skipped,
        [stats]
    )

    const calcPercent = useCallback(
        type => {
            switch (type) {
                case 'skipped':
                    return (stats.skipped * 100) / totalAnsweredQuestions
                case 'wrong':
                    return (stats.wrong * 100) / totalAnsweredQuestions
                case 'correct':
                    return (stats.correct * 100) / totalAnsweredQuestions
                default:
                    return 0
            }
        },
        [stats, totalAnsweredQuestions]
    )

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

    const value = {
        setFilter,
        filter,
        stopwatchRef,
        setCurrentIndex,
        currentIndex,
        pauseStopwatch,
        startStopwatch,
        setStats,
        stats,
        calcPercent,
        totalAnsweredQuestions
    }

    return <Context.Provider value={value}>{children}</Context.Provider>
}

export default FLXQuestionsProvider
