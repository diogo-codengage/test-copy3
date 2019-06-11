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
// import SANSearch from './Search'

const intlPath = 'mainMenu.title.'

const MenuContent = ({ index, setTab, showContinueBar, handleBack }) => {
    const { t } = useTranslation('esanar')

    switch (index) {
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
    const [index, setIndex] = useState(0)
    const [title, setTitle] = useState(t(`${intlPath}menu`))

    useMemo(() => (index === 6 ? setTheme('dark') : setTheme('primary')), [
        index
    ])

    const handleBack = () => {
        setIndex(0)
        setTitle(t(`${intlPath}menu`))
    }

    const setTab = index => {
        switch (index) {
            case 0:
                setIndex(index)
                history.push('/aluno/curso')
                setTitle(t(`${intlPath}menu`))
                break
            case 1:
                setIndex(index)
                setTitle(t(`${intlPath}notifications`))
                break
            case 5:
                history.push('/aluno/banco-questoes')
                break
            case 6:
                setIndex(index)
                setTitle(t(`${intlPath}studying`))
                break
            case 7:
                setIndex(index)
                setTitle(t(`${intlPath}myAccount`))
                break
            case 8:
                setIndex(index)
                setTitle(t(`${intlPath}search`))
                break
            default:
                setIndex(index)
                setTitle(t(`${intlPath}menu`))
        }
    }

    return (
        <ESMainMenu
            // onSearchClick={() => setTab(8)}
            onInitialClick={() => setTab(0)}
            onHome={() => history.push('/aluno/curso')}
            title={title}
            theme={theme}
            showContinueBar
            className='san-main-menu'
        >
            <MenuContent {...{ index, setTab, handleBack }} />
        </ESMainMenu>
    )
}

export default withRouter(SANMenu)
