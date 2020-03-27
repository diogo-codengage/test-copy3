import React, {
    useContext,
    createContext,
    useReducer,
    useState,
    useMemo,
    useRef,
    useCallback
} from 'react'
import { IExamQuestion } from 'Apollo/Exams/Queries/get-questions-from-exam'

/**
 *
 * Interfaces
 *
 */
interface IResponse {
    comment?: any //TODO: ADD TYPE
    answer?: string | null
    questionId?: string | null
    defaultSelected?: string | null
    isHistoric?: boolean
}

interface IAnswer {
    answer?: string | null
    questionId?: string | null
    defaultSelected?: string | null
    correct?: string | null
    skipped?: string | null
    index?: number | null
}

interface IState {
    answers: IAnswer[]
    response: IResponse
    questionIndex: number
}

// TODO: ADD TYPE
const Context = createContext<any>({})

export const useExamsPracticeContext = () => useContext(Context)

// TODO: ADD TYPE
const initialResponse: IResponse = {
    comment: null,
    answer: null,
    questionId: null,
    isHistoric: false,
    defaultSelected: null
}

const initialState: IState = {
    answers: [],
    questionIndex: 0,
    response: {}
}

const reducer = (state = initialState, { payload, type }) => {
    switch (type) {
        case 'SKIP':
            return {
                ...state,
                questionIndex: state.questionIndex + 1,
                response: initialResponse,
                answers: [...state.answers, payload]
            }
        case 'CONFIRM_QUESTION':
            return {
                ...state,
                answers:
                    state.answers.length && payload.skipped
                        ? state.answers.map(item =>
                              item.questionId === payload.questionId
                                  ? { ...payload, skipped: false }
                                  : item
                          )
                        : [...state.answers, payload]
            }
        case 'NEXT':
            return {
                ...state,
                questionIndex: payload || state.questionIndex + 1
            }
        case 'PREVIOUS':
            return {
                ...state,
                questionIndex: state.questionIndex - 1
            }
        default:
            return state
    }
}

const FLXExamsPracticeProvider = ({ children }) => {
    // const { t } = useTranslation('sanarflix')

    // TODO: ADD TYPE
    const [state, dispatch] = useReducer(reducer, initialState)

    // TODO: ADD TYPE
    // const [answers, setAnswers] = useState<IAnswer[]>([])
    const [questions, setQuestions] = useState<IExamQuestion[]>([])

    const stopWatchRef = useRef<any>()

    const startTimer = useCallback(() => {
        stopWatchRef && stopWatchRef.current && stopWatchRef.current.start()
    }, [stopWatchRef])

    const pauseTimer = useCallback(() => {
        stopWatchRef && stopWatchRef.current && stopWatchRef.current.pause()
    }, [stopWatchRef])

    const correctAnswers = useMemo(
        () =>
            (state.answers.filter(item => item.correct).length * 100) /
            state.answers.length,
        [state.answers]
    )

    const wrongAnswers = useMemo(
        () =>
            (state.answers.filter(item => !item.correct && !item.skipped)
                .length *
                100) /
            state.answers.length,
        [state.answers]
    )

    const skippedAnswers = useMemo(
        () =>
            (state.answers.filter(item => item.skipped).length * 100) /
            state.answers.length,
        [state.answers]
    )

    const value = {
        dispatch,
        answers: state.answers,
        correctAnswers,
        wrongAnswers,
        skippedAnswers,
        stopWatchRef,
        startTimer,
        pauseTimer,
        questions,
        setQuestions,
        questionIndex: state.questionIndex
    }

    return <Context.Provider value={value}>{children}</Context.Provider>
}

export const withExamsProvider = Component => props => (
    <FLXExamsPracticeProvider>
        <Component {...props} />
    </FLXExamsPracticeProvider>
)

export default FLXExamsPracticeProvider
