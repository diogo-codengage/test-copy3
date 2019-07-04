import React, { useEffect, forwardRef, useImperativeHandle } from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'

import { withMainMenuProvider, useMainMenuContext } from './context'

import logoSvg from '../../../assets/images/logo/logo.svg'

import ESEvaIcon from '../../Atoms/EvaIcon'
import ESButton from '../../Atoms/Button'

import MainMenuContentHeader from './MainMenuContentHeader'
import ESCardContinueCourse from '../../Atoms/CardContinueCourse/CardContinueCourse'

import { Scrollbars } from 'react-custom-scrollbars'

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
            continueCourseProps
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
            className,
            {
                'es-main-menu__classroom': context === 'classroom'
            }
        )

        const scrollableClasses = classNames(
            'es-main-menu__content--scrollable',
            className,
            {
                'es-main-menu__content--scrollable--element':
                    typeof title !== 'string'
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
            if (width <= 1365 || context === 'classroom') {
                handleOpenOrClose()
            } else {
                handleOpenOrClose(true)
            }

            onInitialClick && onInitialClick(e)
            // setTheme('primary')
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
            // initialClick(e)
        }

        const searchBottomClick = e => {
            handleOpenOrClose(true)
            searchClick(e)
        }

        const handleOpenOrClose = (action = !toggle) => {
            if (width > 1365 && context !== 'classroom') return
            setToggle(action)
        }

        useEffect(() => {
            onOpenOrClose(toggle)
        }, [toggle])

        useImperativeHandle(ref, () => ({
            setToggle: handleOpenOrClose,
            toggle
        }))

        return (
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

                    <div className={scrollableClasses}>
                        <Scrollbars renderTrackHorizontal={() => <div />}>
                            {children}
                        </Scrollbars>
                    </div>
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
                    context !== 'classroom' && (
                        <>
                            {showContinueBar && (
                                <ESCardContinueCourse
                                    className='es-main-menu__continue'
                                    {...continueCourseProps}
                                    borderRadius={false}
                                />
                            )}
                            <div className='es-main-menu__sidebar-bottom'>
                                <HomeButton onClick={onHome} />
                                {onSearchClick && (
                                    <SearchButton onClick={searchBottomClick} />
                                )}
                                <InitalButton onClick={initialBottomClick} />
                            </div>
                        </>
                    )
                )}
                {(staticToolbar || context === 'classroom') && (
                    <div
                        onClick={() => handleOpenOrClose(false)}
                        className='backdrop'
                    />
                )}
            </div>
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
    })
}
ESMainMenu.defaultProps = {
    theme: 'primary',
    logo: logoSvg
}

export default withMainMenuProvider(ESMainMenu)
