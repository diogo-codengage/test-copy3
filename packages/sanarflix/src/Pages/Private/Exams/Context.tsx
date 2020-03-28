import React, { useContext, createContext } from 'react'

// TODO: ADD TYPE
const Context = createContext<any>({})

export const useExamsContext = () => useContext(Context)

const FLXExamsProvider = ({ children, medUniversity }: any) => {
    const value = {
        medUniversity: medUniversity && medUniversity.medUniversity
    }

    return <Context.Provider value={value}>{children}</Context.Provider>
}

export const withExamsProvider = Component => props => (
    <FLXExamsProvider>
        <Component {...props} />
    </FLXExamsProvider>
)

export default FLXExamsProvider
