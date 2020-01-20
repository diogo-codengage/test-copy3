import React, {
    useContext,
    createContext,
    useRef,
    useMemo,
    useCallback,
    useEffect,
    useReducer,
    memo
} from 'react'

import { withRouter, RouteComponentProps } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useApolloClient } from '@apollo/react-hooks'

import { useSnackbarContext } from '@sanar/components'

import {
    GET_QUESTIONS,
    IQuestionsQuery
} from 'Apollo/PracticalArea/Queries/questions'
import { reducer, initialStats, IAction, IState, IFilter } from './reducer'

import { useMainContext } from 'Pages/Private/Context'

interface IRMPracticalProviderValue {
    stopwatchRef: any
    pauseStopwatch: () => void
    startStopwatch: () => void
    calcPercent: (type: 'correct' | 'wrong' | 'skipped') => number
    totalAnsweredQuestions: number
    reset: () => void
    state: IState
    dispatch: React.Dispatch<IAction>
    handleTrackFilter: (values: IFilter) => void
}

const Context = createContext<IRMPracticalProviderValue>(
    {} as IRMPracticalProviderValue
)
export const useQuestionsContext = () => useContext(Context)

const initialState = {
    filter: {},
    currentIndex: 0,
    stats: initialStats,
    questions: [],
    loading: false,
    bookmarked: false
}

const mapItem = item => item.value
const getFilters = (filter: IFilter) => {
    return {
        ...(!!filter.categories && {
            categoriesIds: filter.categories.map(mapItem)
        }),
        ...(!!filter.specialties && {
            specialtiesIds: filter.specialties.map(mapItem)
        }),
        ...(!!filter.subspecialties && {
            subSpecialtiesIds: filter.subspecialties.map(mapItem)
        }),
        ...(!!filter.tags && {
            tagsIds: filter.tags.map(mapItem)
        }),
        ...(!!filter.institutions && {
            institutionIds: filter.institutions
        }),
        ...(!!filter.state && {
            state: filter.state
        }),
        ...(!!filter.years && {
            years: filter.years
        }),
        withImage: filter.onlyHasImages,
        isCommentedByExpert: filter.onlyComments
    }
}

const RMPracticalProvider = memo<RouteComponentProps>(
    ({ children, location: { pathname } }) => {
        const { t } = useTranslation('resmed')
        const client = useApolloClient()
        const snackbar = useSnackbarContext()
        const stopwatchRef = useRef<any>()
        const [state, dispatch] = useReducer<React.Reducer<IState, IAction>>(
            reducer,
            initialState
        )
        const { handleTrack } = useMainContext()

        const handleTrackFilter = values => {
            try {
                handleTrack('Filter used', {
                    'Filter ID': 'Question',
                    'Specialty ID': (values.specialties || []).map(
                        v => v.value
                    ),
                    'Tag ID': (values.tags || []).map(v => v.value),
                    'Institution ID': values.institution,
                    'State ID': values.state,
                    'Commented by Expert': values.onlyComments || false
                })
            } catch {}
        }

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
            try {
                const {
                    data: { questions }
                } = await client.query<IQuestionsQuery>({
                    query: GET_QUESTIONS,
                    fetchPolicy: 'network-only',
                    variables: {
                        limit: 20,
                        ...getFilters(state.filter)
                    }
                })
                dispatch({
                    type: load ? 'success-new' : 'success',
                    questions: questions.items,
                    count: questions.totalCount
                })
            } catch (error) {
                dispatch({ type: 'error', error })
                snackbar({
                    message: t('practicalArea.question.failLoadQuestions'),
                    theme: 'error'
                })
            }
        }

        useEffect(() => {
            if (state.questions && state.questions.length) {
                dispatch({
                    type: 'bookmark',
                    bookmarked:
                        state.questions[state.currentIndex]['bookmarked']
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
            if (
                index === state.questions.length ||
                index === state.questions.length - 3
            ) {
                fetchQuestions()
            }
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [state.currentIndex])

        useEffect(() => {
            handleTrack('Área de Prática viewed')
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [])

        const totalAnsweredQuestions = useMemo(
            () => state.stats.correct + state.stats.wrong + state.stats.skipped,
            [state.stats]
        )

        const calcPercent = useCallback(
            type => {
                switch (type) {
                    case 'skipped':
                        return (
                            (state.stats.skipped * 100) / totalAnsweredQuestions
                        )
                    case 'wrong':
                        return (
                            (state.stats.wrong * 100) / totalAnsweredQuestions
                        )
                    case 'correct':
                        return (
                            (state.stats.correct * 100) / totalAnsweredQuestions
                        )
                    default:
                        return 0
                }
            },
            [state.stats, totalAnsweredQuestions]
        )

        const value = {
            stopwatchRef,
            pauseStopwatch,
            startStopwatch,
            calcPercent,
            totalAnsweredQuestions,
            reset,
            state,
            dispatch,
            handleTrackFilter
        }

        return <Context.Provider value={value}>{children}</Context.Provider>
    }
)

export default withRouter<RouteComponentProps>(RMPracticalProvider)
