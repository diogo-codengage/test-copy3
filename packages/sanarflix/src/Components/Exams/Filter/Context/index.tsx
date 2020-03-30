import React, { useContext, createContext, useState, useReducer } from 'react'

import { useQuery, useLazyQuery } from '@apollo/react-hooks'

import {
    GET_MED_UNIVERSITIES,
    IMedUniversityQuery,
    IMedUniversity
} from 'Apollo/Exams/Queries/medUniversities'
import {
    GET_QUIZ_DISCIPLINES,
    IQuizDisciplinesQuery,
    IQuizDisciplinesVariables,
    IDiscipline
} from 'Apollo/Exams/Queries/quiz-disciplines'
import {
    GET_QUIZ_THEMES,
    IQuizThemesQuery,
    IQuizIThemesVariables,
    ITheme
} from 'Apollo/Exams/Queries/quiz-themes'
import {
    GET_QUIZ_SEMESTERS,
    IQuizISemestersQuery,
    IQuizISemestersVariables,
    ISemester
} from 'Apollo/Exams/Queries/quiz-semesters'

interface IFLXExamFilterProviderValue {
    setCurrentTab: React.Dispatch<React.SetStateAction<ITab>>
    currentTab: ITab
    state: IState
    dispatch: React.Dispatch<IAction>

    handleUniversity: (value: string) => void
    handleDiscipline: (value: string[]) => void
    handleTheme: (value: string[]) => void
    handleSemester: (value: string[]) => void

    trackSearch: (event: string) => void

    universities: IMedUniversity[]
    disciplines: IDiscipline[]
    themes: ITheme[]
    semesters: ISemester[]

    loadingUniversities: boolean
    loadingDisciplines: boolean
    loadingThemes: boolean
    loadingSemesters: boolean
}

const Context = createContext<IFLXExamFilterProviderValue>({} as any)
export const useExamFilterContext = () => useContext(Context)

type ITab = 'university' | 'discipline' | 'theme' | 'semester'

type IAction =
    | { type: 'reset' }
    | { type: 'changeUniversity'; value: string }
    | { type: 'changeDiscipline'; value: string[] }
    | { type: 'changeTheme'; value: string[] }
    | { type: 'changeSemester'; value: string[] }

export interface IState {
    university: string
    discipline: string[]
    theme: string[]
    semester: string[]
}

export interface IYearSemester {
    year: string
    semester: string
}

export interface IFilters extends IState{
    yearSemesters: IYearSemester[]
}

const initialState = {
    university: '',
    discipline: [],
    theme: [],
    semester: []
}

const reducer: React.Reducer<IState, IAction> = (state, action) => {
    switch (action.type) {
        case 'reset':
            return initialState
        case 'changeUniversity':
            return {
                university: action.value,
                discipline: [],
                theme: [],
                semester: []
            }
        case 'changeDiscipline':
            if (
                !!action.value.length ||
                action.value.length < state.discipline.length
            ) {
                return {
                    ...state,
                    discipline: action.value,
                    theme: [],
                    semester: []
                }
            }
            return {
                ...state,
                discipline: initialState.discipline
            }
        case 'changeTheme':
            if (
                !!action.value.length ||
                action.value.length < state.theme.length
            ) {
                return {
                    ...state,
                    theme: action.value,
                    semester: []
                }
            }
            return {
                ...state,
                discipline: action.value
            }
        case 'changeSemester':
            return {
                ...state,
                semester: action.value
            }
        default:
            return state
    }
}

const FLXExamFilterProvider: React.FC = ({ children }) => {
    const [currentTab, setCurrentTab] = useState<ITab>('university')
    const [state, dispatch] = useReducer<React.Reducer<IState, IAction>>(
        reducer,
        initialState
    )
    const { data: dataUniversities, loading: loadingUniversities } = useQuery<
        IMedUniversityQuery
    >(GET_MED_UNIVERSITIES)
    const [
        getDisciplines,
        { data: dataDisciplines, loading: loadingDisciplines }
    ] = useLazyQuery<IQuizDisciplinesQuery, IQuizDisciplinesVariables>(
        GET_QUIZ_DISCIPLINES
    )
    const [
        getThemes,
        { data: dataThemes, loading: loadingThemes }
    ] = useLazyQuery<IQuizThemesQuery, IQuizIThemesVariables>(GET_QUIZ_THEMES)
    const [
        getSemesters,
        { data: dataSemesters, loading: loadingSemesters }
    ] = useLazyQuery<IQuizISemestersQuery, IQuizISemestersVariables>(
        GET_QUIZ_SEMESTERS
    )

    const handleUniversity = value => {
        !!value && getDisciplines({ variables: { medUniversityId: value } })
        dispatch({ type: 'changeUniversity', value })
    }

    const handleDiscipline = value => {
        getThemes({
            variables: {
                medUniversityId: state.university,
                disciplineIds: state.discipline
            }
        })
        dispatch({ type: 'changeDiscipline', value })
    }

    const handleTheme = value => {
        getSemesters({
            variables: {
                medUniversityId: state.university,
                disciplineIds: state.discipline,
                themeIds: state.theme
            }
        })
        dispatch({ type: 'changeTheme', value })
    }

    const handleSemester = value => dispatch({ type: 'changeSemester', value })

    const trackSearch = (event) => {
        window.analytics.track(event, {
            universityId: state.university,
            disciplines: state.discipline,
            themes: state.theme,
            semesters: state.semester
        })
    }

    const value: IFLXExamFilterProviderValue = {
        setCurrentTab,
        currentTab,
        state,
        dispatch,
        handleUniversity,
        handleDiscipline,
        handleTheme,
        handleSemester,
        trackSearch,

        loadingUniversities,
        loadingDisciplines,
        loadingSemesters,
        loadingThemes,

        universities:
            !!dataUniversities && dataUniversities.medUniversities
                ? dataUniversities.medUniversities.data
                : [],
        disciplines:
            !!dataDisciplines && dataDisciplines.quizDisciplines
                ? dataDisciplines.quizDisciplines.data
                : [],
        themes:
            !!dataThemes && dataThemes.quizThemes
                ? dataThemes.quizThemes.data
                : [],
        semesters:
            !!dataSemesters && dataSemesters.quizSemesters
                ? dataSemesters.quizSemesters.data
                : []
    }

    return <Context.Provider value={value}>{children}</Context.Provider>
}

export default FLXExamFilterProvider
