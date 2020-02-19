import React, { useContext, createContext, useState, useReducer } from 'react'

interface IStateAction<T>
    extends React.Dispatch<React.SetStateAction<T | undefined>> {}

interface IFLXExamFilterProviderValue {
    setCurrentTab: React.Dispatch<React.SetStateAction<ITab>>
    currentTab: ITab
    handleSubmit: () => void
    state: IState
    dispatch: React.Dispatch<IAction>

    handleCollege: (value: string) => void
    handleSubject: (value: string[]) => void
    handleTheme: (value: string[]) => void
    handleSemester: (value: string[]) => void
}

const Context = createContext<IFLXExamFilterProviderValue>({} as any)
export const useExamFilterContext = () => useContext(Context)

type ITab = 'college' | 'subject' | 'theme' | 'semester'

type IAction =
    | {
          type: 'reset'
      }
    | { type: 'changeCollege'; value: string }
    | { type: 'changeSubject'; value: string[] }
    | { type: 'changeTheme'; value: string[] }
    | { type: 'changeSemester'; value: string[] }

interface IState {
    college?: string
    subject: string[]
    theme: string[]
    semester: string[]
}

const initialState = {
    college: undefined,
    subject: [],
    theme: [],
    semester: []
}

const reducer: React.Reducer<IState, IAction> = (state, action) => {
    switch (action.type) {
        case 'reset':
            return initialState
        case 'changeCollege':
            return {
                college: action.value,
                subject: [],
                theme: [],
                semester: []
            }
        case 'changeSubject':
            if (
                !!action.value.length ||
                action.value.length < state.subject.length
            ) {
                return {
                    ...state,
                    subject: action.value,
                    theme: [],
                    semester: []
                }
            }
            return {
                ...state,
                subject: action.value
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
                subject: action.value
            }
        case 'changeSemester':
            return {
                ...state,
                semester: action.value
            }
        default:
            throw new Error()
    }
}

const FLXExamFilterProvider: React.FC = ({ children }) => {
    const [currentTab, setCurrentTab] = useState<ITab>('college')
    const [state, dispatch] = useReducer<React.Reducer<IState, IAction>>(
        reducer,
        initialState
    )

    const handleCollege = value => dispatch({ type: 'changeCollege', value })

    const handleSubject = value => dispatch({ type: 'changeSubject', value })

    const handleTheme = value => dispatch({ type: 'changeTheme', value })

    const handleSemester = value => dispatch({ type: 'changeSemester', value })

    const handleSubmit = () => {
        console.log({
            state
        })
    }

    const value: IFLXExamFilterProviderValue = {
        setCurrentTab,
        currentTab,
        handleSubmit,
        state,
        dispatch,
        handleCollege,
        handleSubject,
        handleTheme,
        handleSemester
    }

    return <Context.Provider value={value}>{children}</Context.Provider>
}

export const withFLXExamFilterProvider = Component => props => (
    <FLXExamFilterProvider>
        <Component {...props} />
    </FLXExamFilterProvider>
)

export default FLXExamFilterProvider
