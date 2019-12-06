import React, {
    useContext,
    useState,
    createContext,
    useReducer,
    useRef,
    useEffect
} from 'react'

import { useTranslation } from 'react-i18next'

import { SANClassroomMenuHeader } from '@sanar/components'
import { withRouter } from 'react-router'
import { useApolloClient } from '@apollo/react-hooks'
import { GET_LAST_ACCESSED } from 'Apollo/Menu/Queries/last-accessed'

import { useLastLocation } from 'react-router-last-location'

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
    menuState: boolean
    setMenuState: (state: boolean) => void
    footerProps: Object
    setFooterProps: (state: Object) => void
    lastAccessed: any
    setLastAccessed: (item) => void
    context: any
    setContext: (context) => void
    loadLastAcessed: () => void
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
    navigations: defaultNavigations,
    menuState: false,
    setMenuState: () => {},
    footerProps: false,
    setFooterProps: () => {},
    lastAccessed: {},
    setLastAccessed: () => {},
    context: {},
    setContext: () => {},
    loadLastAcessed: () => {}
}

const Context = createContext<IFLXLayoutProviderValue>(defaultValue)
export const useLayoutContext = () => useContext(Context)

const hasClassroom = window.location.href.split('/').includes('sala-aula')

const initialState: IInitialState = {
    indexMenu: 0,
    menuTitle: 'Menu',
    darkMode: hasClassroom,
    menuContext: hasClassroom ? 'classroom' : 'general'
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

const FLXLayoutProvider = withRouter(({ history, children }) => {
    const { t } = useTranslation('sanarflix')
    const [state, dispatch] = useReducer(reducer, initialState)
    const [navigations, setNavigations] = useState<INagivations>(
        defaultNavigations
    )
    const [menuState, setMenuState] = useState(false)
    const [context, setContext] = useState('general')
    const [lastAccessed, setLastAccessed] = useState()

    const [footerProps, setFooterProps] = useState({})

    //TODO: type Ref with TS into @sanar/components
    const menuRef: any = useRef()

    const client = useApolloClient()

    const onCloseMenu = () => {
        menuRef && menuRef.current && menuRef.current.setToggle(false)
    }

    const onOpenMenu = () => {
        menuRef && menuRef.current && menuRef.current.setToggle(true)
    }

    const handleClassroomBack = () => {
            history.push(`/portal/curso/${window.location.hash.split('/')[3]}`)
    }

    const loadLastAcessed = async () => {
        try {
            const { data } = await client.query({
                query: GET_LAST_ACCESSED,
                fetchPolicy: 'network-only'
            })

            setLastAccessed(data.lastAccessed)
        } catch (e) {
            setLastAccessed({ hasError: true, loading: false })
        }
    }

    useEffect(() => {
        loadLastAcessed()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const setMenuTab = index => {
        switch (index) {
            case 0:
                dispatch({
                    type: 'changeMenuTab',
                    payload: {
                        ...initialState,
                        darkMode: false,
                        menuContext: 'general'
                    }
                })
                break
            case 1:
                dispatch({
                    type: 'changeMenuTab',
                    payload: {
                        indexMenu: index,
                        menuTitle: (
                            <SANClassroomMenuHeader
                                onBack={handleClassroomBack}
                                onClose={onCloseMenu}
                            />
                        ),
                        darkMode: true,
                        menuContext: 'classroom'
                    }
                })
                break
            case 2:
                dispatch({
                    type: 'changeMenuTab',
                    payload: {
                        indexMenu: index,
                        menuTitle: t('mainMenu.account.title')
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

    const value = {
        currentMenuIndex: state.indexMenu,
        currentMenuTitle: state.menuTitle,
        setMenuTab,
        menuRef,
        onCloseMenu,
        onOpenMenu,
        darkMode: state.darkMode,
        menuContext: state.menuContext,
        navigations,
        setNavigations,
        menuState,
        setMenuState,
        footerProps,
        setFooterProps,
        lastAccessed,
        setLastAccessed,
        context,
        setContext,
        loadLastAcessed
    }

    return <Context.Provider value={value}>{children}</Context.Provider>
})

export const withLayoutProvider = Component => props => (
    <FLXLayoutProvider>
        <Component {...props} />
    </FLXLayoutProvider>
)

export default FLXLayoutProvider
