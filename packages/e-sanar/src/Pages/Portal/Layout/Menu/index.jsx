import React, { useState, useMemo, useEffect } from 'react'

import { useTranslation } from 'react-i18next'
import { withRouter } from 'react-router'

import ESMainMenu from 'sanar-ui/dist/Components/Organisms/MainMenu'
import ESButton from 'sanar-ui/dist/Components/Atoms/Button'
import ESEvaIcon from 'sanar-ui/dist/Components/Atoms/EvaIcon'

import SANInitial from './Initial'
import SANNotifications from './Notifications'
import SANCourseChange from './CourseChange'
import SANMyAccount from './MyAccount'
import SANClassPlaylist, { SANClassPlaylistMenuHeader } from './ClassPlaylist'
import { useLayoutContext } from '../../Layout/Context'

const intlPath = 'mainMenu.title.'

const toDarkMode = [6, 9]

const MenuContent = ({ indexMenu, setTab, showContinueBar, handleBack }) => {
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
    const { indexMenu, setIndexMenu, darkMode, openMenu } = useLayoutContext()
    const [title, setTitle] = useState(t(`${intlPath}menu`))

    useMemo(
        () =>
            toDarkMode.includes(indexMenu) || darkMode
                ? setTheme('dark')
                : setTheme('primary'),
        [indexMenu, darkMode]
    )

    const handleBack = () => {
        setIndexMenu(0)
        setTitle(t(`${intlPath}menu`))
    }

    useEffect(() => {
        if (indexMenu === 9) {
            setTitle(<SANClassPlaylistMenuHeader />)
        } else {
            setTab(indexMenu)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [indexMenu])

    const setTab = indexMenu => {
        switch (indexMenu) {
            case 0:
                setIndexMenu(indexMenu)
                history.push('/aluno/curso')
                setTitle(t(`${intlPath}menu`))
                break
            case 1:
                setIndexMenu(indexMenu)
                setTitle(t(`${intlPath}notifications`))
                break
            case 5:
                history.push('/aluno/banco-questoes')
                break
            case 6:
                setIndexMenu(indexMenu)
                setTitle(t(`${intlPath}studying`))
                break
            case 7:
                setIndexMenu(indexMenu)
                setTitle(t(`${intlPath}myAccount`))
                break
            case 8:
                setIndexMenu(indexMenu)
                setTitle(t(`${intlPath}search`))
                break
            case 9:
                setTitle(<h1>Heheh</h1>)
                setIndexMenu(indexMenu)
                break
            default:
                setIndexMenu(indexMenu)
                setTitle(t(`${intlPath}menu`))
        }
    }

    const handleInitialClick = () => {
        setIndexMenu(indexMenu)
        setTitle(t(`${intlPath}menu`))
    }

    const handleHome = () => history.push('/aluno/curso')

    const onOpenOrClose = isOpen => {
        // setOpenMenu(isOpen)
    }

    return (
        <ESMainMenu
            // onSearchClick={() => setTab(8)}
            onInitialClick={handleInitialClick}
            onHome={handleHome}
            title={title}
            theme={theme}
            showContinueBar
            context={darkMode ? 'classroom' : ''}
            className='san-main-menu'
            open={openMenu}
            onOpenOrClose={onOpenOrClose}
        >
            <MenuContent {...{ indexMenu, setTab, handleBack }} />
        </ESMainMenu>
    )
}

export default withRouter(SANMenu)
