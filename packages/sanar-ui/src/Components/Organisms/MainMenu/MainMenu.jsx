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
            size='small'
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

const ESMainMenu = ({ className, title, theme: themeProp }) => {
    const {
        position,
        theme,
        setTheme,
        toggle,
        setToggle
    } = useMainMenuContext()

    const classes = classNames(
        'es-main-menu',
        `es-main-menu__${theme}`,
        className
    )
    const classesContent = classNames('es-main-menu__content', {
        open: position === 'bottom' && toggle,
        close: position === 'bottom' && !toggle
    })

    useEffect(() => {
        setTheme(themeProp)
    }, [themeProp])

    return (
        <div className={classes}>
            {position === 'left' ? (
                <div className='es-main-menu__sidebar-left'>
                    <div className='es-main-menu__sidebar-left--actions'>
                        <InitalButton onClick={() => setTheme('primary')} />
                        <SearchButton onClick={() => setTheme('light')} />
                    </div>
                    <img src={logoSvg} />
                </div>
            ) : (
                <div className='es-main-menu__sidebar-bottom'>
                    <HomeButton onClick={() => setToggle(true)} />
                    <SearchButton
                        onClick={() => {
                            setTheme('light')
                            setToggle(true)
                        }}
                    />
                    <InitalButton onClick={() => setToggle(true)} />
                </div>
            )}

            <div className={classesContent}>
                <MainMenuContentHeader title={title} />
            </div>
        </div>
    )
}

ESMainMenu.propTypes = {
    className: PropTypes.string,
    theme: PropTypes.oneOf(['primary', 'dark', 'light'])
}
ESMainMenu.defaultProps = {
    theme: 'primary'
}

export default withMainMenuProvider(ESMainMenu)
