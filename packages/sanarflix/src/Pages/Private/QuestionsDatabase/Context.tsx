import React, { useContext, createContext } from 'react'

interface IFLXQuestionsProviderValue {}

const Context = createContext<IFLXQuestionsProviderValue>({} as any)
export const useQuestionsContext = () => useContext(Context)

const FLXQuestionsProvider: React.FC = ({ children }) => {
    const value: IFLXQuestionsProviderValue = {}

    return <Context.Provider value={value}>{children}</Context.Provider>
}

export default FLXQuestionsProvider
