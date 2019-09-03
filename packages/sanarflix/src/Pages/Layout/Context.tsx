import React, {
    useContext,
    useState,
    createContext,
    useReducer,
    useRef
} from 'react'

import { SANClassroomMenuHeader } from '@sanar/components'
import { withRouter } from 'react-router'

type IMenuContext = 'general' | 'classroom'

interface IInitialState {
    indexMenu: number
    menuTitle: string
    darkMode: boolean
    menuContext: IMenuContext
}

type IFLXLayoutProviderValue = {
    currentMenuIndex: number
    currentMenuTitle: string
    setMenuTab: (index: number) => void
    onCloseMenu: () => void
    onOpenMenu: () => void
    menuRef: any
    darkMode?: boolean
    menuContext?: IMenuContext
    navigations: INagivations
    setNavigations: (nav: INagivations) => void
}

const defaultNavigations = {
    next: {},
    previous: {}
}

const defaultValue: IFLXLayoutProviderValue = {
    currentMenuIndex: 0,
    currentMenuTitle: 'Menu',
    setMenuTab: () => {},
    onCloseMenu: () => {},
    onOpenMenu: () => {},
    menuRef: null,
    setNavigations: () => {},
    navigations: defaultNavigations
}

const Context = createContext(defaultValue)
export const useLayoutContext = () => useContext(Context)

const initialState: IInitialState = {
    indexMenu: 0,
    menuTitle: 'Menu',
    darkMode: false,
    menuContext: 'general'
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

interface IAction {
    children?: string
    onClick?: () => void
    disabled?: boolean
}

interface INagivations {
    next: IAction
    previous: IAction
}

const FLXLayoutProvider: any = withRouter(({ history, children }) => {
    const [state, dispatch] = useReducer(reducer, initialState)
    const [navigations, setNavigations] = useState<INagivations>(
        defaultNavigations
    )

    //TODO: type Ref with TS into @sanar/components
    const menuRef: any = useRef()

    const onCloseMenu = () => {
        menuRef && menuRef.current && menuRef.current.setToggle(false)
    }

    const onOpenMenu = () => {
        menuRef && menuRef.current && menuRef.current.setToggle(true)
    }

    const setMenuTab = index => {
        switch (index) {
            case 0:
                dispatch({
                    type: 'changeMenuTab',
                    payload: initialState
                })
                break
            case 1:
                dispatch({
                    type: 'changeMenuTab',
                    payload: {
                        indexMenu: index,
                        menuTitle: (
                            <SANClassroomMenuHeader
                                onBack={() => history.push('/')}
                                onClose={onCloseMenu}
                            />
                        ),
                        darkMode: true,
                        menuContext: 'classroom'
                    }
                })
                break
            default:
                dispatch({
                    type: 'changeMenuTab',
                    payload: initialState
                })
        }
    }

    const value: IFLXLayoutProviderValue = {
        currentMenuIndex: state.indexMenu,
        currentMenuTitle: state.menuTitle,
        setMenuTab,
        menuRef,
        onCloseMenu,
        onOpenMenu,
        darkMode: state.darkMode,
        menuContext: state.menuContext,
        navigations,
        setNavigations
    }

    return <Context.Provider value={value}>{children}</Context.Provider>
})

export const withLayoutProvider = Component => props => (
    <FLXLayoutProvider>
        <Component {...props} />
    </FLXLayoutProvider>
)

export default FLXLayoutProvider
