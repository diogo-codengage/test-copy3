import React, { useEffect, forwardRef, useImperativeHandle } from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import { RemoveScroll } from 'react-remove-scroll'

import { withMainMenuProvider, useMainMenuContext } from './context'

import logoSvg from '../../../assets/images/logo/logo.svg'

import ESEvaIcon from '../../Atoms/EvaIcon'
import ESButton from '../../Atoms/Button'

import MainMenuContentHeader from './MainMenuContentHeader'
import ESCardContinueCourse from '../../Atoms/CardContinueCourse/CardContinueCourse'

const breakpoint = 1365

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
    <SideButton name={name} {...props} data-testid='menu-search-button' />
)
const HomeButton = ({ name = 'home-outline', ...props }) => (
    <SideButton name={name} {...props} data-testid='menu-home-button' />
)
const InitalButton = ({ name = 'keypad-outline', ...props }) => (
    <SideButton name={name} {...props} data-testid='menu-initial-button' />
)

const ESMainMenu = forwardRef(
    (
        {
            className,
            title,
            children,
            onSearchClick,
            onInitialClick,
            theme: themeProp,
            showContinueBar: showContinueBarProp,
            logo,
            onHome,
            context: contextProp,
            onOpenOrClose,
            continueCourseProps,
            onToggle
        },
        ref
    ) => {
        const {
            position,
            theme,
            setTheme,
            toggle,
            setToggle,
            staticToolbar,
            showContinueBar,
            setShowContinueBar,
            width,
            context,
            setContext
        } = useMainMenuContext()

        const classes = classNames(
            'es-main-menu',
            `es-main-menu__${theme}`,
            className
        )

        const classesWrapper = classNames({
            'es-main-menu__classroom': context === 'classroom'
        })

        const scrollableClasses = classNames(
            'es-main-menu__content--scrollable',
            className,
            {
                'es-main-menu__content--scrollable--element':
                    typeof title !== 'string' || !showContinueBar
            }
        )

        const classesContent = classNames('es-main-menu__content', {
            open: toggle,
            close: !toggle
        })

        useEffect(() => {
            setContext(contextProp)
            handleOpenOrClose(false)
        }, [contextProp])

        useEffect(() => {
            setTheme(themeProp)
        }, [themeProp])

        useEffect(() => {
            setShowContinueBar(showContinueBarProp)
        }, [showContinueBarProp])

        const initialClick = e => {
            if (width <= breakpoint || context === 'classroom') {
                handleOpenOrClose()
            } else {
                handleOpenOrClose(true)
            }

            onInitialClick && onInitialClick(e)
        }

        const searchClick = e => {
            handleOpenOrClose(true)
            onSearchClick && onSearchClick(e)

            if (context !== 'classroom') {
                setTheme('light')
            }
        }

        const initialBottomClick = e => {
            handleOpenOrClose(true)
            initialClick(e)
        }

        const searchBottomClick = e => {
            handleOpenOrClose(true)
            searchClick(e)
        }

        const handleOpenOrClose = (action = !toggle) => {
            if (width >= breakpoint && context != 'classroom') {
                setToggle(true)
                return
            }
            setToggle(action)
            !!onToggle && onToggle(action)
        }

        useEffect(() => {
            onOpenOrClose(toggle)
        }, [toggle])

        useImperativeHandle(ref, () => ({
            setToggle: handleOpenOrClose,
            toggle
        }))

        return (
            <RemoveScroll
                className={classesWrapper}
                enabled={toggle && width <= breakpoint}
            >
                <div className={classes}>
                    <div className={classesContent}>
                        {typeof title === 'string' ? (
                            <MainMenuContentHeader
                                onClose={handleOpenOrClose}
                                title={title}
                            />
                        ) : (
                            title
                        )}

                        <div className={scrollableClasses}>{children}</div>
                    </div>

                    {position === 'left' ? (
                        <div className='es-main-menu__sidebar-left'>
                            <div className='es-main-menu__sidebar-left--actions'>
                                <InitalButton onClick={initialClick} />
                                {onSearchClick && (
                                    <SearchButton onClick={searchClick} />
                                )}
                            </div>
                            <img className='logo' src={logo} />
                        </div>
                    ) : (
                        <>
                            {showContinueBar && (
                                <ESCardContinueCourse
                                    className='es-main-menu__continue'
                                    {...continueCourseProps}
                                    borderRadius={false}
                                />
                            )}
                            {context !== 'classroom' && (
                                <div className='es-main-menu__sidebar-bottom'>
                                    <HomeButton onClick={onHome} />
                                    {onSearchClick && (
                                        <SearchButton
                                            onClick={searchBottomClick}
                                        />
                                    )}
                                    <InitalButton
                                        onClick={initialBottomClick}
                                    />
                                </div>
                            )}
                        </>
                    )}
                    {(staticToolbar || context === 'classroom') && (
                        <div
                            onClick={() => handleOpenOrClose(false)}
                            className='backdrop'
                        />
                    )}
                </div>
            </RemoveScroll>
        )
    }
)

ESMainMenu.propTypes = {
    className: PropTypes.string,
    theme: PropTypes.oneOf(['primary', 'dark', 'light']),
    onInitialClick: PropTypes.func,
    onSearchClick: PropTypes.func,
    onHome: PropTypes.func,
    showContinueBar: PropTypes.bool,
    logo: PropTypes.string,
    continueCourseProps: PropTypes.shape({
        onContinue: PropTypes.func,
        module: PropTypes.string,
        description: PropTypes.string
    }),
    onToggle: PropTypes.func
}
ESMainMenu.defaultProps = {
    theme: 'primary',
    logo: logoSvg
}

export default withMainMenuProvider(ESMainMenu)
