import React, {
    createContext,
    useContext,
    useState,
    useRef,
    useEffect,
    useReducer
} from 'react'
import { withRouter } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { SANClassPlaylistMenuHeader } from './Menu/ClassPlaylist'

const Context = createContext()

export const useLayoutContext = () => useContext(Context)

const intlPath = 'mainMenu.title.'

const initialState = {
    indexMenu: 0,
    menuTitle: 'Menu'
}

const reducer = (state, { payload, type }) => {
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

const LayoutProvider = ({ children, history }) => {
    const { t } = useTranslation('esanar')
    const [darkMode, setDarkMode] = useState(false)
    const [menuIsOpen, setMenuIsOpen] = useState(false)
    const [pageContext, setPageContext] = useState(null)
    const stopwatchRef = useRef()
    const menuRef = useRef({})

    const [state, dispatch] = useReducer(reducer, initialState)

    useEffect(() => {
        if (stopwatchRef && stopwatchRef.current) {
            !menuIsOpen
                ? stopwatchRef.current.start()
                : stopwatchRef.current.pause()
        }
    }, [menuIsOpen])

    const menuOpenOrClose = action => {
        menuRef.current.setToggle(action)
    }

    const setMenuTab = index => {
        switch (index) {
            case 0:
                dispatch({
                    type: 'changeMenuTab',
                    payload: {
                        indexMenu: index,
                        menuTitle: t(`${intlPath}menu`)
                    }
                })
                break
            case 1:
                dispatch({
                    type: 'changeMenuTab',
                    payload: {
                        indexMenu: index,
                        menuTitle: t(`${intlPath}notifications`)
                    }
                })
                break
            case 3:
                history.push('/aluno/favoritos')
                break
            case 5:
                break
            case 6:
                dispatch({
                    type: 'changeMenuTab',
                    payload: {
                        indexMenu: index,
                        menuTitle: t(`${intlPath}studying`)
                    }
                })
                break
            case 7:
                dispatch({
                    type: 'changeMenuTab',
                    payload: {
                        indexMenu: index,
                        menuTitle: t(`${intlPath}myAccount`)
                    }
                })
                break
            case 8:
                dispatch({
                    type: 'changeMenuTab',
                    payload: {
                        indexMenu: index,
                        menuTitle: t(`${intlPath}search`)
                    }
                })
                break
            case 9:
                dispatch({
                    type: 'changeMenuTab',
                    payload: {
                        indexMenu: index,
                        menuTitle: <SANClassPlaylistMenuHeader />
                    }
                })
                break
            default:
                dispatch({
                    type: 'changeMenuTab',
                    payload: {
                        indexMenu: 0,
                        menuTitle: t(`${intlPath}menu`)
                    }
                })
        }
    }

    const value = {
        darkMode,
        setDarkMode,
        indexMenu: state.indexMenu,
        setMenuTab,
        menuTitle: state.menuTitle,
        stopwatchRef,
        menuRef,
        menuOpenOrClose,
        setMenuIsOpen,
        pageContext,
        setPageContext
    }

    return <Context.Provider value={value}>{children}</Context.Provider>
}

export const SANLayoutProvider = withRouter(LayoutProvider)

export const withLayoutProvider = Component => props => (
    <SANLayoutProvider>
        <Component {...props} />
    </SANLayoutProvider>
)
