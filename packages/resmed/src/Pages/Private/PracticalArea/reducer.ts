import { IQuestion } from 'Apollo/PracticalArea/Queries/questions'
import { IState as ICountryState } from 'Apollo/PracticalArea/Queries/states'

export type IAction =
    | {
          type: 'reset'
      }
    | { type: 'empty' }
    | { type: 'loading' }
    | { type: 'loaded' }
    | { type: 'stats'; stats: Partial<IStats> }
    | { type: 'success'; questions: IQuestion[]; count: number }
    | { type: 'next' }
    | { type: 'error'; error: any }
    | { type: 'bookmark'; bookmarked: boolean }
    | { type: 'filter'; filter: IFilter }

export interface IState {
    filter: IFilter
    currentIndex: number
    stats: IStats
    questions: IQuestion[]
    loading: boolean
    bookmarked: boolean
}

interface IOwner {
    label: string
    value: string
}

export interface IFilter {
    categories?: IOwner[]
    specialties?: IOwner[]
    subspecialties?: IOwner[]
    lessons?: IOwner[]
    institution?: IOwner
    year?: any
    state?: ICountryState
    onlyHasImages?: boolean
    onlyComments?: boolean
}

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

const initialState = {
    filter: {},
    currentIndex: 0,
    stats: initialStats,
    questions: [],
    loading: false,
    bookmarked: false
}

export const reducer: React.Reducer<IState, IAction> = (state, action) => {
    switch (action.type) {
        case 'reset':
            return initialState
        case 'empty':
            return {
                ...initialState,
                filter: state.filter,
                currentIndex: 0
            }
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
                filter: action.filter
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
