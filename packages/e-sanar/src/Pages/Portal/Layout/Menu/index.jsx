import React, { useState, useMemo } from 'react'

import { useTranslation } from 'react-i18next'

import ESMainMenu from 'sanar-ui/dist/Components/Organisms/MainMenu'

import SANInitial from './Initial'
import SANNotifications from './Notifications'
import SANCourseChange from './CourseChange'
import SANMyAccount from './MyAccount'
import SANSearch from './Search'

const intlPath = 'mainMenu.title.'

const SANMenu = () => {
    const { t } = useTranslation()
    const [theme, setTheme] = useState('light')
    const [index, setIndex] = useState(0)
    const [title, setTitle] = useState(t(`${intlPath}menu`))

    useMemo(() => (index === 6 ? setTheme('dark') : setTheme('primary')), [
        index
    ])

    const setTab = index => {
        setIndex(index)
        switch (index) {
            case 0:
                return setTitle(t(`${intlPath}menu`))
            case 1:
                return setTitle(t(`${intlPath}notifications`))
            case 6:
                return setTitle(t(`${intlPath}studying`))
            case 7:
                return setTitle(t(`${intlPath}myAccount`))
            case 8:
                return setTitle(t(`${intlPath}search`))
            default:
                return setTitle(t(`${intlPath}menu`))
        }
    }

    return (
        <ESMainMenu
            onSearchClick={() => setTab(8)}
            onInitialClick={() => setTab(0)}
            title={title}
            theme={theme}
            className='san-main-menu'
        >
            {index === 0 && <SANInitial {...{ setTab }} />}
            {index === 1 && <SANNotifications {...{ setTab }} />}
            {index === 6 && <SANCourseChange {...{ setTab }} />}
            {index === 7 && <SANMyAccount {...{ setTab }} />}
            {index === 8 && <SANSearch />}
        </ESMainMenu>
    )
}

export default SANMenu
