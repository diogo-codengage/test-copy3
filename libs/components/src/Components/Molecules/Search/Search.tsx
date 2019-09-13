import React, { useState, useRef, useEffect } from 'react'
import styled, { css } from 'styled-components'

import { theme, ifProp } from 'styled-tools'
import { useTranslation } from 'react-i18next'
import { RemoveScroll } from 'react-remove-scroll'
import FocusLock from 'react-focus-lock'

import useOnClickOutside from 'sanar-ui/dist/Hooks/useOnClickOutside'
import useWindowSize from 'sanar-ui/dist/Hooks/useWindowSize'

import { SANInput, ISANInputProps } from '../../Atoms/Input'
import { SANBox } from '../../Atoms/Box'
import { SANButton } from '../../Atoms/Button'
import { SANTypography } from '../../Atoms/Typography'
import { SANEvaIcon } from '../../Atoms/EvaIcon'

const borderBottomRadius = css`
    border-bottom-left-radius: 20px;
    border-bottom-right-radius: 20px;
`

const Dropdown = styled.div`
    border: 1px solid ${theme('colors.grey.2')};
    box-shadow: 0 4px 8px ${theme('colors.grey.2')};
    ${borderBottomRadius}
    border-top: none;
    transition: all 0.3s ease-in;
    position: absolute;
    background-color: ${theme('colors.white.10')};
    width: 100%;
    z-index: 1050;

    @media (max-width: 414px) {
        ${ifProp(
            'hasFocus',
            css`
                border: none;
                box-shadow: none;
                border-bottom-right-radius: 0;
                border-bottom-left-radius: 0;
            `
        )}
    }
`

const Icon = styled(SANEvaIcon)`
    && {
        color: ${theme('colors.grey.3')};
    }
`

const ItemStyled = styled(SANBox)`
    && {
        cursor: pointer;
        &:hover {
            background-color: ${theme('colors.grey.0')};
        }
        @media (max-width: 414px) {
            ${ifProp(
                'hasFocus',
                css`
                    border-radius: 0;
                    border-bottom-right-radius: 0;
                    border-bottom-left-radius: 0;
                `
            )}
        }
        &:last-child {
            ${borderBottomRadius}
        }
    }
`

const Search = styled(SANInput)<{ hasItems: boolean; hasFocus: boolean }>`
    && {
        transition: all 0.2s ease-in;
        ${ifProp(
            'hasItems',
            css`
                @media (min-width: 414px) {
                    border-bottom-right-radius: 0;
                    border-bottom-left-radius: 0;
                }
            `
        )}

        @media (max-width: 414px) {
            ${ifProp(
                'hasFocus',
                css`
                    margin: ${theme('spance.md')};
                    height: 32px;
                `
            )}
        }
    }
`

const Wrapper = styled.div`
    position: relative;
    width: 100%;

    @media (max-width: 414px) {
        ${ifProp(
            'hasFocus',
            css`
                background-color: ${theme('colors.white.10')};
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                z-index: 1000;
            `
        )}
    }
`

const Padding = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    @media (max-width: 414px) {
        ${ifProp(
            'hasFocus',
            css`
                padding: ${theme('space.md')};
            `
        )}
    }
`

interface IItem {
    id: string
    title: string
    onClick: () => void
}

export interface ISANSearchProps {
    InputProps?: ISANInputProps
    onEnter?: React.ChangeEventHandler
    seeMore?: () => void
    data?: IItem[]
}

const boldString = (text: string, search: string) => {
    const pattern = `(\\s|\\b)(${search})(\\s|\\b)`
    const regexp = new RegExp(pattern, 'ig')
    const replaceMask = `$1<strong>$2</strong>$3`

    return text.replace(regexp, replaceMask)
}

const renderItem = search => item => (
    <Item
        onClick={item.onClick}
        key={item.id}
        title={item.title}
        icon='search-outline'
        search={search}
    />
)

const Item = ({ title, icon, onClick, search = null }) => (
    <ItemStyled
        onClick={onClick}
        display='flex'
        alignItems='center'
        px='md'
        py='sm'
    >
        <Icon name={icon} mr='md' />
        <SANTypography variant='subtitle2' color='grey.6'>
            {!!search ? (
                <div
                    dangerouslySetInnerHTML={{
                        __html: boldString(title, search)
                    }}
                />
            ) : (
                title
            )}
        </SANTypography>
        <div />
    </ItemStyled>
)

const SANSearch: React.FC<ISANSearchProps> = ({
    InputProps,
    onEnter,
    seeMore,
    data = []
}) => {
    const { t } = useTranslation('components')
    const { width } = useWindowSize()
    const inputRef = useRef()
    const dropdownRef = useRef()
    const [items, setItems] = useState<IItem[]>([])
    const [hasFocus, setFocus] = useState(false)

    const handleKeyDown = e => {
        if (e.key === 'Enter' && !!onEnter) {
            onEnter(e)
        }
        if (e.key === 'Escape') {
            clickOutside()
        }
    }

    const handleFocus = e => {
        e.stopPropagation()
        setFocus(true)
        if (!!data && !!data.length) {
            setItems(data)
        }
    }

    const handleBlur = e => {
        e.stopPropagation()
        setFocus(false)
    }

    const clickOutside = () => {
        !!items.length && setItems([])
        hasFocus && setFocus(false)
        if (!!inputRef && !!inputRef.current) {
            inputRef.current.blur()
        }
    }

    useOnClickOutside([inputRef, dropdownRef], clickOutside, [
        inputRef,
        dropdownRef,
        clickOutside
    ])

    useEffect(() => {
        setItems(data)
    }, [data])

    return (
        <RemoveScroll enabled={hasFocus && width <= 414}>
            <FocusLock disabled={!hasFocus}>
                <Wrapper {...{ hasFocus }}>
                    <Padding {...{ hasFocus }}>
                        <Search
                            iconRight='search-outline'
                            round
                            onKeyDown={handleKeyDown}
                            onBlur={handleBlur}
                            onFocus={handleFocus}
                            {...InputProps}
                            hasItems={!!items.length}
                            hasFocus={hasFocus}
                            ref={inputRef}
                        />
                        {hasFocus && width <= 414 && (
                            <SANButton
                                onClick={clickOutside}
                                variant='text'
                                size='small'
                                ml='xs'
                            >
                                {t('search.cancel')}
                            </SANButton>
                        )}
                    </Padding>
                    {!!items.length && (
                        <Dropdown ref={dropdownRef} {...{ hasFocus }}>
                            {items.map(renderItem(InputProps.value))}
                            <Item
                                onClick={seeMore}
                                icon='menu-2-outline'
                                title={t('search.seeMore')}
                                {...{ hasFocus }}
                            />
                        </Dropdown>
                    )}
                </Wrapper>
            </FocusLock>
        </RemoveScroll>
    )
}

export default SANSearch
