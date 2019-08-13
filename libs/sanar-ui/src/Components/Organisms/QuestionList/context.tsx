import React, { createContext, useContext } from 'react'

const Context = createContext(null)

export const useQuestionContext = () => useContext(Context)

export const QuestionProvider = ({ children }) => {
    const value = {}

    return <Context.Provider value={value}>{children}</Context.Provider>
}

export const withQuestionProvider = Component => props => (
    <QuestionProvider>
        <Component {...props} />
    </QuestionProvider>
)
