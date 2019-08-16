import React, { createContext, useContext, useState } from 'react'

const Context = createContext()

export const useFormContext = () => useContext(Context)

export const FormProvider = ({ children }) => {
    const [form, setForm] = useState({})

    const value = {
        form,
        setForm
    }

    return <Context.Provider value={value}>{children}</Context.Provider>
}

export const withFormProvider = Component => props => (
    <FormProvider>
        <Component {...props} />
    </FormProvider>
)
