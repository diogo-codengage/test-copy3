import React, { useMemo, useState, createContext, useContext } from 'react'

const Context = createContext()

export const useSignInFormContext = () => useContext(Context)

export const SignInFormProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const value = {
        user,
        setUser
    }

    return <Context.Provider value={value}>{children}</Context.Provider>
}

export const withSignInFormProvider = Component => props => (
    <SignInFormProvider>
        <Component {...props} />
    </SignInFormProvider>
)
