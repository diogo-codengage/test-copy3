import React, {
    createContext,
    useState,
    useRef,
    useMemo,
    useContext
} from 'react'

const Context = createContext()

export const useQuestionsContext = () => useContext(Context)

export const SANQuestionsProvider = ({ children }) => {
    const stopwatchRef = useRef()
    const [filter, setFilter] = useState({})
    const [skippedQuestions, setSkippedQuestions] = useState(0)
    const [wrongQuestions, setWrongQuestions] = useState(0)
    const [correctQuestions, setCorrectQuestions] = useState(0)
    const [totalQuestions, setRotalQuestions] = useState(0)

    useMemo(
        () =>
            setRotalQuestions(
                skippedQuestions + wrongQuestions + correctQuestions
            ),
        [skippedQuestions, wrongQuestions, correctQuestions]
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
        totalQuestions,
        stopwatchRef
    }

    return <Context.Provider value={value}>{children}</Context.Provider>
}
