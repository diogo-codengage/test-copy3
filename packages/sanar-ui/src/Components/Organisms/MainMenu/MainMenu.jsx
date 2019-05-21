import React, { useEffect } from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'

import { withMainMenuProvider, useMainMenuContext } from './context'

import logoSvg from '../../../assets/images/logo/logo.svg'

import ESEvaIcon from '../../Atoms/EvaIcon'
import ESButton from '../../Atoms/Button'

import MainMenuContentHeader from './MainMenuContentHeader'

const SideButton = ({ name, ...props }) => {
    const { theme } = useMainMenuContext()
    return (
        <ESButton
            {...props}
            size='medium'
            variant='text'
            color={theme === 'light' ? 'default' : 'white'}
            circle
        >
            <ESEvaIcon name={name} />
        </ESButton>
    )
}

const SearchButton = ({ name = 'search-outline', ...props }) => (
    <SideButton name={name} {...props} />
)
const HomeButton = ({ name = 'home-outline', ...props }) => (
    <SideButton name={name} {...props} />
)
const InitalButton = ({ name = 'keypad-outline', ...props }) => (
    <SideButton name={name} {...props} />
)

const ESMainMenu = ({
    className,
    title,
    children,
    onSearchClick,
    onInitialClick,
    theme: themeProp
}) => {
    const {
        position,
        theme,
        setTheme,
        toggle,
        setToggle,
        staticToolbar,
        onClose
    } = useMainMenuContext()

    const classes = classNames(
        'es-main-menu',
        `es-main-menu__${theme}`,
        className
    )
    const classesContent = classNames('es-main-menu__content', {
        open: (staticToolbar || position === 'bottom') && toggle,
        close: (staticToolbar || position === 'bottom') && !toggle
    })

    useEffect(() => {
        setTheme(themeProp)
    }, [themeProp])

    const initialClick = e => {
        setToggle(true)
        onInitialClick && onInitialClick(e)
        setTheme('primary')
    }

    const searchClick = e => {
        setToggle(true)
        onSearchClick && onSearchClick(e)
        setTheme('light')
    }

    const initialBottomClick = e => {
        setToggle(true)
        initialClick(e)
    }

    const searchBottomClick = e => {
        setToggle(true)
        searchClick(e)
    }

    return (
        <div className={classes}>
            {position === 'left' ? (
                <div className='es-main-menu__sidebar-left'>
                    <div className='es-main-menu__sidebar-left--actions'>
                        <InitalButton onClick={initialClick} />
                        <SearchButton onClick={searchClick} />
                    </div>
                    <img className='logo' src={logoSvg} />
                </div>
            ) : (
                <div className='es-main-menu__sidebar-bottom'>
                    <HomeButton onClick={() => setToggle(true)} />
                    <SearchButton onClick={searchBottomClick} />
                    <InitalButton onClick={initialBottomClick} />
                </div>
            )}

            <div className={classesContent}>
                <MainMenuContentHeader title={title} />
                <div className='es-main-menu__content--scrollable'>
                    {children}
                </div>
            </div>
            {staticToolbar && <div onClick={onClose} className='backdrop' />}
        </div>
    )
}

ESMainMenu.propTypes = {
    className: PropTypes.string,
    theme: PropTypes.oneOf(['primary', 'dark', 'light']),
    onInitialClick: PropTypes.func,
    onSearchClick: PropTypes.func
}
ESMainMenu.defaultProps = {
    theme: 'primary'
}

export default withMainMenuProvider(ESMainMenu)
