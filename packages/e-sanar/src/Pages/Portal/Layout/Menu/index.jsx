import React, { useState, useMemo } from 'react'

import { useTranslation } from 'react-i18next'
import { withRouter } from 'react-router'

import ESMainMenu from 'sanar-ui/dist/Components/Organisms/MainMenu'
import ESButton from 'sanar-ui/dist/Components/Atoms/Button'
import ESEvaIcon from 'sanar-ui/dist/Components/Atoms/EvaIcon'

import SANInitial from './Initial'
import SANNotifications from './Notifications'
import SANCourseChange from './CourseChange'
import SANMyAccount from './MyAccount'
import SANClassPlaylist from './ClassPlaylist'
import { useLayoutContext } from '../../Layout/Context'

const intlPath = 'mainMenu.title.'

const toDarkMode = [6, 9]

//TODO: Improve setTab
const MenuContent = ({ indexMenu, setMenuTab: setTab, handleBack }) => {
    const { t } = useTranslation('esanar')

    switch (indexMenu) {
        case 0:
            return <SANInitial {...{ setTab }} />
        case 1:
            return <SANNotifications {...{ handleBack }} />
        case 6:
            return <SANCourseChange {...{ handleBack }} />
        case 7:
            return <SANMyAccount {...{ handleBack }} />
        // case 8:
        //     return <SANSearch />
        case 9:
            return <SANClassPlaylist />
        default:
            return (
                <div className='pl-md pr-md mb-md'>
                    <ESButton
                        className='mb-md'
                        size='xsmall'
                        variant='outlined'
                        color='white'
                        block
                        onClick={() => setTab(0)}
                    >
                        <ESEvaIcon name='arrow-back-outline' />
                        {t('mainMenu.back')}
                    </ESButton>
                </div>
            )
    }
}

const SANMenu = ({ history }) => {
    const { t } = useTranslation('esanar')
    const [theme, setTheme] = useState('light')
    const {
        indexMenu,
        darkMode,
        openMenu,
        setMenuTab,
        menuTitle,
        setMenuTitle
    } = useLayoutContext()

    useMemo(
        () =>
            toDarkMode.includes(indexMenu) || darkMode
                ? setTheme('dark')
                : setTheme('primary'),
        [indexMenu, darkMode]
    )

    const handleBack = () => {
        setMenuTab(0)
        setMenuTitle(t(`${intlPath}menu`))
    }

    const handleInitialClick = () => {
        setMenuTab(indexMenu)
        setMenuTitle(t(`${intlPath}menu`))
    }

    const handleHome = () => history.push('/aluno/curso')

    const onOpenOrClose = isOpen => {
        // setOpenMenu(isOpen)
    }

    return (
        <ESMainMenu
            // onSearchClick={() => setMenuTab(8)}
            onInitialClick={handleInitialClick}
            onHome={handleHome}
            title={menuTitle}
            theme={theme}
            showContinueBar
            context={darkMode ? 'classroom' : ''}
            className='san-main-menu'
            open={openMenu}
            onOpenOrClose={onOpenOrClose}
        >
            <MenuContent {...{ indexMenu, setMenuTab, handleBack }} />
        </ESMainMenu>
    )
}

export default withRouter(SANMenu)
