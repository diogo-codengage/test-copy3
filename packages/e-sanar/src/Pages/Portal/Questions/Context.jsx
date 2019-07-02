import React, {
    createContext,
    useState,
    useRef,
    useMemo,
    useContext,
    useCallback,
    useEffect
} from 'react'

import { withRouter } from 'react-router-dom'

import { useAuthContext } from 'Hooks/auth'
import { useApolloContext } from 'Hooks/apollo'
import { GET_QUESTIONS } from 'Apollo/Questions/queries/questions'

const Context = createContext()

export const useQuestionsContext = () => useContext(Context)

const QuestionsProvider = ({ children, location: { pathname }, history }) => {
    const client = useApolloContext()
    const [limit] = useState(20)
    const [firstLoad, setFirstLoad] = useState(false)
    const [questions, setQuestions] = useState([])
    const { getEnrollment } = useAuthContext()
    const { course } = getEnrollment()

    const stopwatchRef = useRef()
    const [filter, setFilter] = useState({})
    const [formState, setFormState] = useState({ progress: '1' })
    const [skippedQuestions, setSkippedQuestions] = useState(0)
    const [wrongQuestions, setWrongQuestions] = useState(0)
    const [correctQuestions, setCorrectQuestions] = useState(0)
    const [totalQuestions, setTotalQuestions] = useState(0)
    const [currentIndex, setCurrentIndex] = useState(1)
    const [loadedItems, setLoadedItems] = useState(0)

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

    const reset = () => {
        setFilter(oldFilter => ({
            ...oldFilter,
            reset: true
        }))
        setSkippedQuestions(0)
        setWrongQuestions(0)
        setCorrectQuestions(0)
        setTotalQuestions(0)
        setCurrentIndex(1)

        if (stopwatchRef && stopwatchRef.current) {
            stopwatchRef.current.reset()
            stopwatchRef.current.start()
        }
    }

    const fetchQuestions = async (load, reset, skip = 0) => {
        load && setFirstLoad(true)
        const {
            data: {
                questions: { data, count = 0 }
            }
        } = await client.query({
            query: GET_QUESTIONS,
            fetchPolicy: 'network-only',
            variables: {
                ...filter,
                courseIds: [course.id],
                limit,
                skip: loadedItems
            }
        })

        if (reset) {
            setTotalQuestions(count)
            setQuestions(data)
            setLoadedItems(data.length)
        } else {
            const aggregate = [...questions, ...data]
            setLoadedItems(old => old + data.length)
            setQuestions(aggregate)
        }

        setFirstLoad(false)
    }

    useEffect(() => {
        const paths = pathname.split('/')
        paths[paths.length - 1] === 'pratica' && fetchQuestions(true, true)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filter])

    useEffect(() => {
        const paths = pathname.split('/')
        if (paths[paths.length - 1] === 'pratica') {
            if (totalQuestions > currentIndex) {
                questions.length <= 2 && fetchQuestions(false)
            } else if (totalQuestions > 0 && currentIndex > 0) {
                history.push('/aluno/banco-questoes/finalizado')
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [questions])

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
        setTotalQuestions,
        reset,
        questions,
        setQuestions,
        firstLoad,
        fetchQuestions
    }

    return <Context.Provider value={value}>{children}</Context.Provider>
}

export const SANQuestionsProvider = withRouter(QuestionsProvider)
