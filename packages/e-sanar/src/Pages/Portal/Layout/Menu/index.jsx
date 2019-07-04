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
import { usePortalContext } from 'Pages/Portal/Context'
import { getClassRoute } from 'Utils/getClassRoute'

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
    const [theme, setTheme] = useState('light')
    const { t } = useTranslation('esanar')
    const {
        indexMenu,
        darkMode,
        setMenuTab,
        menuTitle,
        menuRef,
        setMenuIsOpen
    } = useLayoutContext()
    const { lastAccessed } = usePortalContext()

    useMemo(
        () =>
            toDarkMode.includes(indexMenu) || darkMode
                ? setTheme('dark')
                : setTheme('primary'),
        [indexMenu, darkMode]
    )

    const handleBack = () => {
        setMenuTab()
    }

    const handleInitialClick = () => {
        setMenuTab()
    }

    const handleHome = () => history.push('/aluno/curso')

    const goClassroom = () =>
        history.push(
            `/aluno/sala-aula/${lastAccessed.module_id}/${getClassRoute(
                lastAccessed.resource_type
            )}/${lastAccessed.resource_id}`
        )

    const continueCourseProps = {
        ...(lastAccessed && {
            module: t('mainMenu.continueCourse', {
                module: lastAccessed.module_order + 1,
                class: lastAccessed.resource_order + 1
            }),
            description: lastAccessed.module_title,
            onContinue: goClassroom
        })
    }

    return (
        <ESMainMenu
            ref={menuRef}
            onInitialClick={handleInitialClick}
            onHome={handleHome}
            title={menuTitle}
            theme={theme}
            showContinueBar
            context={darkMode ? 'classroom' : ''}
            className='san-main-menu'
            continueCourseProps={continueCourseProps}
            onOpenOrClose={setMenuIsOpen}
        >
            <MenuContent {...{ indexMenu, setMenuTab, handleBack }} />
        </ESMainMenu>
    )
}

export default withRouter(SANMenu)
