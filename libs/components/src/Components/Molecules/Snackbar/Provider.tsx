import React, { createContext, useContext } from 'react'

import { SnackbarProvider, wrapComponent } from 'react-snackbar-alert'
import SANSnackbar from './Snackbar'

const Context = createContext({})

export const useSnackbarContext = () => {
    const { createSnackbar } = useContext(Context) as any
    return createSnackbar
}

export const SANContext = wrapComponent(({ children, ...props }) => (
    <Context.Provider value={props}>{children}</Context.Provider>
))

const SANSnackbarProvider = ({ children }) => {
    return (
        <SnackbarProvider component={SANSnackbar} position='top'>
            <SANContext>{children}</SANContext>
        </SnackbarProvider>
    )
}

export default SANSnackbarProvider
