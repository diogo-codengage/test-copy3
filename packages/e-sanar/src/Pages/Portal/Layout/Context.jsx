import React, { createContext, useContext, useState } from 'react'
import { withRouter } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { SANClassPlaylistMenuHeader } from './Menu/ClassPlaylist'

const Context = createContext()

export const useLayoutContext = () => useContext(Context)

const intlPath = 'mainMenu.title.'

const LayoutProvider = ({ children, history }) => {
    const { t } = useTranslation('esanar')

    const [darkMode, setDarkMode] = useState(false)
    const [indexMenu, setIndexMenu] = useState(0)
    const [openMenu, setOpenMenu] = useState(false)
    const [menuTitle, setMenuTitle] = useState(t(`${intlPath}menu`))

    const setMenuTab = index => {
        switch (index) {
            case 0:
                setIndexMenu(index)
                // history.push('/aluno/curso')
                setMenuTitle(t(`${intlPath}menu`))
                break
            case 1:
                setIndexMenu(index)
                setMenuTitle(t(`${intlPath}notifications`))
                break
            case 5:
                history.push('/aluno/banco-questoes')
                break
            case 6:
                setIndexMenu(index)
                setMenuTitle(t(`${intlPath}studying`))
                break
            case 7:
                setIndexMenu(index)
                setMenuTitle(t(`${intlPath}myAccount`))
                break
            case 8:
                setIndexMenu(index)
                setMenuTitle(t(`${intlPath}search`))
                break
            case 9:
                setMenuTitle(<SANClassPlaylistMenuHeader />)
                setIndexMenu(index)
                break
            default:
                setIndexMenu(index)
                setMenuTitle(t(`${intlPath}menu`))
        }
    }

    const value = {
        darkMode,
        setDarkMode,
        indexMenu,
        setIndexMenu,
        openMenu,
        setOpenMenu,
        setMenuTab,
        menuTitle,
        setMenuTitle
    }

    return <Context.Provider value={value}>{children}</Context.Provider>
}

export const SANLayoutProvider = withRouter(LayoutProvider)

export const withLayoutProvider = Component => props => (
    <SANLayoutProvider>
        <Component {...props} />
    </SANLayoutProvider>
)
