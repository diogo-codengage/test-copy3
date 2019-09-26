import React, {
    useContext,
    createContext,
    useState,
    useRef,
    useMemo,
    useCallback,
    useEffect
} from 'react'

import { useTranslation } from 'react-i18next'
import { useApolloClient } from '@apollo/react-hooks'

import { useSnackbarContext } from '@sanar/components'

import { GET_QUESTIONS } from 'Apollo/QuestionsDatabase/Queries/questions'

interface IFLXQuestionsProviderValue {
    setFilter: React.Dispatch<React.SetStateAction<IFilter>>
    filter: IFilter
    stopwatchRef: any
    setCurrentIndex: React.Dispatch<React.SetStateAction<number>>
    currentIndex: number
    pauseStopwatch: () => void
    startStopwatch: () => void
    setStats: React.Dispatch<React.SetStateAction<IStats>>
    stats: IStats
    calcPercent: (type: 'correct' | 'wrong' | 'skipped') => number
    totalAnsweredQuestions: number
    reset: () => void
    setSkip: React.Dispatch<React.SetStateAction<number>>
    skip: number
    questions: any[]
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
    loading: boolean
    bookmarked: boolean
    setBookmark: React.Dispatch<React.SetStateAction<boolean>>
}

const Context = createContext<IFLXQuestionsProviderValue>(
    {} as IFLXQuestionsProviderValue
)
export const useQuestionsContext = () => useContext(Context)

interface IStats {
    correct: number
    wrong: number
    skipped: number
    total: number
    time: string
}

interface IValue {
    value: string
    label: string
}

interface IFilter {
    selectedCourses: IValue[]
    selectedThemes: IValue[]
}

export const initialStats = {
    correct: 0,
    wrong: 0,
    skipped: 0,
    total: 0,
    time: '00:00:00'
}

const getId = e => e.value

const FLXQuestionsProvider: React.FC = ({ children }) => {
    const { t } = useTranslation('sanarflix')
    const client = useApolloClient()
    const snackbar = useSnackbarContext()
    const stopwatchRef = useRef<any>()
    const [currentIndex, setCurrentIndex] = useState(0)
    const [bookmarked, setBookmark] = useState(false)
    const [skip, setSkip] = useState(0)
    const [loading, setLoading] = useState(false)
    const [stats, setStats] = useState<IStats>(initialStats)
    const [questions, setQuestions] = useState<any[]>([])
    const [filter, setFilter] = useState<IFilter>({
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

    const reset = () => {
        setFilter(oldFilter => ({
            ...oldFilter,
            reset: true
        }))
        setStats(initialStats)
        setCurrentIndex(0)
        setSkip(0)

        if (stopwatchRef && stopwatchRef.current) {
            stopwatchRef.current.reset()
            stopwatchRef.current.start()
        }
    }

    const fetchQuestions = async (load = false) => {
        load && setLoading(true)
        const { selectedCourses, selectedThemes } = filter
        const courseIds = !!selectedCourses.length && selectedCourses.map(getId)
        const levelIds = !!selectedThemes.length && selectedThemes.map(getId)
        try {
            const {
                data: { questions }
            } = await client.query({
                query: GET_QUESTIONS,
                fetchPolicy: 'network-only',
                variables: {
                    ...(!!courseIds && { courseIds }),
                    ...(!!levelIds && { levelIds }),
                    limit: 20,
                    skip
                }
            })
            setQuestions(old => [...old, ...questions.data])
            setSkip(old => old + questions.data.length)
            setStats(oldStats => ({
                ...oldStats,
                total: questions.count
            }))
        } catch {
            snackbar({
                message: t('questionsDatabase.question.failLoadQuestions'),
                theme: 'error'
            })
        }
        load && setLoading(false)
    }

    useEffect(() => {
        if (questions && questions.length) {
            setBookmark(questions[currentIndex]['bookmarked'])
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentIndex, questions])

    useEffect(() => {
        fetchQuestions(true)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filter])

    useEffect(() => {
        const index = currentIndex + 1
        if (index === skip || index === skip - 3) {
            fetchQuestions()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentIndex])

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
        totalAnsweredQuestions,
        reset,
        setSkip,
        skip,
        questions,
        setLoading,
        loading,
        bookmarked,
        setBookmark
    }

    return <Context.Provider value={value}>{children}</Context.Provider>
}

export default FLXQuestionsProvider
