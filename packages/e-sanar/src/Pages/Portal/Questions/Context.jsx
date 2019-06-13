import React, {
    createContext,
    useState,
    useRef,
    useMemo,
    useContext,
    useCallback
} from 'react'

const Context = createContext()

export const useQuestionsContext = () => useContext(Context)

export const SANQuestionsProvider = ({ children }) => {
    const stopwatchRef = useRef()
    const [filter, setFilter] = useState({})
    const [formState, setFormState] = useState({})
    const [skippedQuestions, setSkippedQuestions] = useState(0)
    const [wrongQuestions, setWrongQuestions] = useState(0)
    const [correctQuestions, setCorrectQuestions] = useState(0)
    const [totalQuestions, setTotalQuestions] = useState(0)
    const [currentIndex, setCurrentIndex] = useState(0)

    const totalAnsweredQuestions = useMemo(
        () => skippedQuestions + wrongQuestions + correctQuestions,
        [skippedQuestions, wrongQuestions, correctQuestions]
    )

    const calcPercent = useCallback(
        type => {
            switch (type) {
                case 'skipped':
                    return (skippedQuestions * 100) / totalAnsweredQuestions
                case 'wrong':
                    return (wrongQuestions * 100) / totalAnsweredQuestions
                case 'correct':
                    return (correctQuestions * 100) / totalAnsweredQuestions
                default:
                    return 0
            }
        },
        [
            skippedQuestions,
            wrongQuestions,
            correctQuestions,
            totalAnsweredQuestions
        ]
    )

    const value = {
        filter,
        setFilter,
        skippedQuestions,
        setSkippedQuestions,
        wrongQuestions,
        setWrongQuestions,
        correctQuestions,
        setCorrectQuestions,
        totalAnsweredQuestions,
        stopwatchRef,
        calcPercent,
        formState,
        setFormState,
        currentIndex,
        setCurrentIndex,
        totalQuestions,
        setTotalQuestions
    }

    return <Context.Provider value={value}>{children}</Context.Provider>
}