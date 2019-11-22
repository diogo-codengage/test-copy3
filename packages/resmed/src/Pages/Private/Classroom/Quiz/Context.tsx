import React, { useContext, createContext, useState, useEffect } from 'react'

import { useWindowSize } from '@sanar/utils/dist/Hooks'

import { useLayoutContext } from 'Pages/Private/Layout/Context'

interface IRMClassroomQuizProviderValue {
    setQuestions: (any) => void
    questions: any[]
    setQuestionsMap: React.Dispatch<React.SetStateAction<any[]>>
    questionsMap: any[]
}

const Context = createContext<IRMClassroomQuizProviderValue>({} as any)
export const useClassroomQuizContext = () => useContext(Context)

const RMClassroomQuizProvider: React.FC = ({ children }) => {
    const { width } = useWindowSize()
    const { setFooterProps } = useLayoutContext()
    const [questions, setQuestions] = useState<any[]>([])
    const [questionsMap, setQuestionsMap] = useState<any[]>([])

    useEffect(() => {
        if (width <= 768) {
            setFooterProps({
                mb: 8
            })
        } else {
            setFooterProps({
                mb: 0
            })
        }
        return () =>
            setFooterProps({
                mb: 0
            })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [width])

    useEffect(() => {
        setQuestionsMap(questions)
    }, [questions])

    const value: IRMClassroomQuizProviderValue = {
        questions,
        setQuestions,
        setQuestionsMap,
        questionsMap
    }

    return <Context.Provider value={value}>{children}</Context.Provider>
}

export const withClassroomProvider = Component => props => (
    <RMClassroomQuizProvider>
        <Component {...props} />
    </RMClassroomQuizProvider>
)

export default RMClassroomQuizProvider
