import React, { useContext, createContext, useReducer, useRef } from 'react'

type IInitialState = {
    indexMenu: number
    menuTitle: string
}

type IFLXLayoutProviderValue = {
    currentMenuIndex: number
    currentMenuTitle: string
    setMenuTab: (index: number) => void
    onCloseMenu: () => void
    menuRef: any
}

const defaultValue: IFLXLayoutProviderValue = {
    currentMenuIndex: 1,
    currentMenuTitle: 'Menu',
    setMenuTab: () => {},
    onCloseMenu: () => {},
    menuRef: null
}

const Context = createContext(defaultValue)
export const useLayoutContext = () => useContext(Context)

const initialState: IInitialState = {
    indexMenu: 0,
    menuTitle: 'Menu'
}

const reducer = (state = initialState, { payload, type }) => {
    switch (type) {
        case 'changeMenuTab':
            return {
                ...state,
                ...payload
            }
        default:
            return state
    }
}

const FLXLayoutProvider: React.FC = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState)

    //TODO: type Ref with TS into @sanar/components
    const menuRef: any = useRef()

    const onCloseMenu = () => {
        menuRef && menuRef.current && menuRef.current.setToggle(false)
    }

    const setMenuTab = index => {
        switch (index) {
            case 0:
                dispatch({
                    type: 'changeMenuTab',
                    payload: {
                        indexMenu: index,
                        menuTitle: 'Menu'
                    }
                })
                break
            default:
                dispatch({
                    type: 'changeMenuTab',
                    payload: {
                        indexMenu: index,
                        menuTitle: 'Menu'
                    }
                })
        }
    }

    const value: IFLXLayoutProviderValue = {
        currentMenuIndex: state.index,
        currentMenuTitle: state.menuTitle,
        setMenuTab,
        menuRef,
        onCloseMenu
    }

    return <Context.Provider value={value}>{children}</Context.Provider>
}

export const withLayoutProvider = Component => props => (
    <FLXLayoutProvider>
        <Component {...props} />
    </FLXLayoutProvider>
)

export default FLXLayoutProvider