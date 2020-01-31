import React, {
    useContext,
    createContext,
    useRef,
    useMemo,
    useCallback,
    useEffect,
    useReducer
} from 'react'

import { withRouter, RouteComponentProps } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useApolloClient } from '@apollo/react-hooks'

import { useSnackbarContext } from '@sanar/components'

import { GET_QUESTIONS } from 'Apollo/QuestionsDatabase/Queries/questions'

interface IFLXQuestionsProviderValue {
    stopwatchRef: any
    pauseStopwatch: () => void
    startStopwatch: () => void
    calcPercent: (type: 'correct' | 'wrong' | 'skipped') => number
    totalAnsweredQuestions: number
    reset: () => void
    state: IState
    dispatch: React.Dispatch<IAction>
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

interface IState {
    filter: IFilter
    currentIndex: number
    stats: IStats
    skip: number
    questions: any[]
    loading: boolean
    bookmarked: boolean
}

type IAction =
    | {
          type: 'reset'
      }
    | { type: 'loading' }
    | { type: 'loaded' }
    | { type: 'stats'; stats: Partial<IStats> }
    | { type: 'success'; questions: any[]; count: number }
    | { type: 'next' }
    | { type: 'error'; error: any }
    | { type: 'bookmark'; bookmarked: boolean }
    | { type: 'filter'; filter: IFilter }

const initialState = {
    filter: {
        selectedCourses: [],
        selectedThemes: []
    },
    currentIndex: 0,
    stats: initialStats,
    skip: 0,
    questions: [],
    loading: false,
    bookmarked: false
}

const reducer: React.Reducer<IState, IAction> = (state, action) => {
    switch (action.type) {
        case 'reset':
            return initialState
        case 'loading':
            return {
                ...state,
                loading: true
            }
        case 'loaded':
            return {
                ...state,
                loading: false
            }
        case 'success':
            return {
                ...state,
                error: false,
                loading: false,
                skip: state.skip + action.questions.length,
                questions: [...state.questions, ...action.questions],
                stats: {
                    ...state.stats,
                    total: action.count
                }
            }
        case 'error':
            return {
                ...state,
                loading: false,
                error: action.error
            }
        case 'next':
            return {
                ...state,
                currentIndex: state.currentIndex + 1
            }
        case 'bookmark':
            return {
                ...state,
                bookmarked: action.bookmarked
            }
        case 'filter':
            return {
                ...state,
                filter: action.filter,
                questions: [],
                skip: 0
            }
        case 'stats':
            return {
                ...state,
                stats: {
                    ...state.stats,
                    ...action.stats
                }
            }
        default:
            throw new Error()
    }
}

const FLXQuestionsProvider: React.FC<RouteComponentProps> = ({
    children,
    location: { pathname }
}) => {
    const { t } = useTranslation('sanarflix')
    const client = useApolloClient()
    const snackbar = useSnackbarContext()
    const stopwatchRef = useRef<any>()
    const [state, dispatch] = useReducer<React.Reducer<IState, IAction>>(
        reducer,
        initialState
    )

    const totalAnsweredQuestions = useMemo(
        () => state.stats.correct + state.stats.wrong + state.stats.skipped,
        [state.stats]
    )

    const calcPercent = useCallback(
        type => {
            switch (type) {
                case 'skipped':
                    return (state.stats.skipped * 100) / totalAnsweredQuestions
                case 'wrong':
                    return (state.stats.wrong * 100) / totalAnsweredQuestions
                case 'correct':
                    return (state.stats.correct * 100) / totalAnsweredQuestions
                default:
                    return 0
            }
        },
        [state.stats, totalAnsweredQuestions]
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
        dispatch({ type: 'reset' })

        if (stopwatchRef && stopwatchRef.current) {
            stopwatchRef.current.reset()
            stopwatchRef.current.start()
        }
    }

    const fetchQuestions = async (load = false) => {
        load && dispatch({ type: 'loading' })
        const { selectedCourses, selectedThemes } = state.filter
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
                    skip: state.skip
                }
            })
            dispatch({
                type: 'success',
                questions: questions.data,
                count: questions.count
            })
        } catch (error) {
            dispatch({ type: 'error', error })
            snackbar({
                message: t('questionsDatabase.question.failLoadQuestions'),
                theme: 'error'
            })
        }
    }

    useEffect(() => {
        if (state.questions && state.questions.length) {
            dispatch({
                type: 'bookmark',
                bookmarked: state.questions[state.currentIndex]['bookmarked']
            })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state.currentIndex, state.questions])

    useEffect(() => {
        const paths = pathname.split('/')
        paths[paths.length - 1] === 'pratica' && fetchQuestions(true)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state.filter])

    useEffect(() => {
        const index = state.currentIndex + 1
        if (index === state.skip || index === state.skip - 3) {
            fetchQuestions()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state.currentIndex])

    const value = {
        stopwatchRef,
        pauseStopwatch,
        startStopwatch,
        calcPercent,
        totalAnsweredQuestions,
        reset,
        state,
        dispatch
    }

    return <Context.Provider value={value}>{children}</Context.Provider>
}

export default withRouter(FLXQuestionsProvider)
