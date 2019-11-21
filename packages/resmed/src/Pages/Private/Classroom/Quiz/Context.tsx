import React, { useContext, createContext, useState, useEffect } from 'react'

interface IFLXClassroomQuizProviderValue {
    setQuestions: (any) => void
    questions: any[]
    setQuestionsMap: React.Dispatch<React.SetStateAction<any[]>>
    questionsMap: any[]
}

const Context = createContext<IFLXClassroomQuizProviderValue>({} as any)
export const useClassroomQuizContext = () => useContext(Context)

const FLXClassroomQuizProvider: React.FC = ({ children }) => {
    const [questions, setQuestions] = useState<any[]>([])
    const [questionsMap, setQuestionsMap] = useState<any[]>([])

    useEffect(() => {
        setQuestionsMap(questions)
    }, [questions])

    const value: IFLXClassroomQuizProviderValue = {
        questions,
        setQuestions,
        setQuestionsMap,
        questionsMap
    }

    return <Context.Provider value={value}>{children}</Context.Provider>
}

export const withClassroomProvider = Component => props => (
    <FLXClassroomQuizProvider>
        <Component {...props} />
    </FLXClassroomQuizProvider>
)

export default FLXClassroomQuizProvider
