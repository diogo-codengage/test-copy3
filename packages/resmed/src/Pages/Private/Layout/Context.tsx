import React, { useContext, useState, createContext, useRef } from 'react'

import { useTranslation } from 'react-i18next'
import { withRouter, RouteComponentProps } from 'react-router'

type IMenuContext = 'general' | 'classroom'

interface IMenuState {
    indexMenu: number
    menuTitle: string
    darkMode?: boolean
    menuContext?: IMenuContext
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
    setNavigations: React.Dispatch<React.SetStateAction<INagivations>>
}

const defaultNavigations = {
    next: {},
    previous: {}
}

const Context = createContext<IFLXLayoutProviderValue>(
    ({} as {}) as IFLXLayoutProviderValue
)
export const useLayoutContext = () => useContext(Context)

interface IAction {
    children?: string
    onClick?: () => void
    disabled?: boolean
}

interface INagivations {
    next: IAction
    previous: IAction
}

const hasClassroom = window.location.href.split('/').includes('sala-aula')

const defaultMenuState: IMenuState = {
    indexMenu: 0,
    menuTitle: 'Menu',
    darkMode: hasClassroom,
    menuContext: hasClassroom ? 'classroom' : 'general'
}

const FLXLayoutProvider: React.FC<RouteComponentProps> = ({ children }) => {
    const { t } = useTranslation('resmed')
    const [menuState, setMenuState] = useState<IMenuState>({
        ...defaultMenuState,
        menuTitle: t('mainMenu.initial.title')
    })
    const [navigations, setNavigations] = useState<INagivations>(
        defaultNavigations
    )
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
                setMenuState({
                    ...defaultMenuState,
                    darkMode: false,
                    menuContext: 'general'
                })
                break
            case 1:
                setMenuState({
                    ...defaultMenuState,
                    indexMenu: index,
                    menuTitle: t('mainMenu.account.title')
                })
                break
            default:
                setMenuState(defaultMenuState)
        }
    }

    const value = {
        currentMenuIndex: menuState.indexMenu,
        currentMenuTitle: menuState.menuTitle,
        darkMode: menuState.darkMode,
        menuContext: menuState.menuContext,
        setMenuTab,
        menuRef,
        onCloseMenu,
        onOpenMenu,
        navigations,
        setNavigations
    }

    return <Context.Provider value={value}>{children}</Context.Provider>
}

export default withRouter(FLXLayoutProvider)
