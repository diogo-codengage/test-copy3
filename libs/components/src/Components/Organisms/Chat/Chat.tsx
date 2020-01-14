import React, { useCallback, useRef, useEffect, useState, useMemo } from 'react'

import { useTranslation } from 'react-i18next'
import styled from 'styled-components'

import { useWindowSize } from '@sanar/utils/dist/Hooks'
import { createDebounce } from '@sanar/utils/dist/Debounce'

import { SANButton } from '../../Atoms/Button'
import { SANBox } from '../../Atoms/Box'
import { SANAvatar } from '../../Atoms/Avatar'
import { SANEvaIcon } from '../../Atoms/EvaIcon'
import { SANScroll } from '../../Atoms/Scroll'
import { SANTypography } from '../../Atoms/Typography'
import {
    SANInfiniteScroll,
    ISANInfiniteScrollProps
} from '../../Atoms/InfiniteScroll'

import SANChatEmpty from './Empty'
import { SANChatItem, renderSkeleton, skeletons } from './Item'

const SANInputStyled = styled.div`
    border: none;
    box-shadow: none;
    padding: 0;
    overflow-y: auto;
    overflow-x: hidden;
    max-height: 84px;

    &:focus {
        outline: none;
    }

    &[placeholder]:empty:before {
        content: attr(placeholder);
        color: #555;
    }

    [placeholder]:empty:focus::before {
        content: '';
    }

    /* width */
    ::-webkit-scrollbar {
        width: 6px;
    }

    /* Track */
    ::-webkit-scrollbar-track {
        border-radius: 3px;
    }

    /* Handle */
    ::-webkit-scrollbar-thumb {
        background: #aaa;
        border-radius: 3px;
    }

    /* Handle on hover */
    ::-webkit-scrollbar-thumb:hover {
        background: #999;
    }
`

interface IParams {
    setSubmitting: React.Dispatch<React.SetStateAction<boolean>>
}

export interface ISANChatProps {
    image?: string
    messages: any[]
    InfiniteProps?: ISANInfiniteScrollProps
    onSend?: (value: string, params: IParams) => void
    blocked?: boolean
    loading?: boolean
}

const maxLetters = 400

const SANChat: React.FC<ISANChatProps> = ({
    image,
    InfiniteProps,
    messages,
    onSend,
    blocked,
    loading
}) => {
    const { t } = useTranslation('components')
    const { width } = useWindowSize()
    const [submitting, setSubmitting] = useState(false)
    const [hasButton, setHasButton] = useState(false)
    const [inputHeight, setInputHeight] = useState(width > 768 ? 21 : 42)
    const [letterCount, setLetterCount] = useState(0)
    const scrollRef = useRef<any>()
    const inputRef = useRef<any>()

    const handleSend = () => {
        if (letterCount >= maxLetters) return
        setSubmitting(true)
        !!onSend && onSend(inputRef.current.textContent, { setSubmitting })
        if (!!inputRef && !!inputRef.current) {
            inputRef.current.textContent = undefined
            inputRef.current.focus()
            setInputHeight(21)
        }
    }

    const handleKeyPress = e => {
        if (e.charCode === 13) {
            e.preventDefault()
            handleSend()
        }
    }

    const goScrollBottom = () => {
        if (!!scrollRef && !!scrollRef.current) {
            scrollRef.current.scrollTo(0, scrollRef.current.scrollHeight)
        }
    }

    const handleScroll = () => {
        if (!!inputRef && !!inputRef.current) {
            if (
                inputRef.current.scrollHeight <= 84 &&
                !!inputRef.current.textContent
            ) {
                setInputHeight(inputRef.current.scrollHeight)
            }
            if (!inputRef.current.textContent) {
                setInputHeight(21)
            }
        }
    }

    const handleLetterCount = useCallback(() => {
        if (!!inputRef && !!inputRef.current) {
            setLetterCount(inputRef.current.innerText.length)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const debounceCountLetter = createDebounce(handleLetterCount, 500)

    const renderMessage = useCallback(
        (message, index) => (
            <SANChatItem
                {...message}
                key={index}
                mt={index === 0 ? 'md' : '0px'}
            />
        ),
        [messages]
    )

    const colorCount = useMemo(() => {
        if (letterCount <= 300) {
            return 'grey.6'
        } else if (letterCount > 300 && letterCount <= 350) {
            return 'yellow.1'
        } else if (letterCount > 350 && letterCount <= 400) {
            return 'yellow.2'
        } else {
            return 'error'
        }
    }, [letterCount])

    useEffect(() => {
        goScrollBottom()
    }, [messages])

    useEffect(() => {
        if (!!inputRef && !!inputRef.current) {
            inputRef.current.addEventListener('input', debounceCountLetter)
        }
        return () => {
            if (!!inputRef && !!inputRef.current) {
                inputRef.current.removeEventListener(
                    'input',
                    debounceCountLetter
                )
            }
        }
    }, [messages])

    const content = useMemo(() => {
        if (loading) {
            return skeletons.map(renderSkeleton)
        } else if (!loading && !!messages && !!messages.length) {
            return messages.map(renderMessage)
        } else {
            return <SANChatEmpty />
        }
    }, [loading, messages])

    return (
        <SANBox display='flex' flexDirection='column' minWidth={232}>
            <SANBox
                bg='grey-solid.1'
                flex='1'
                height='314px'
                borderRadius='base'
                position='relative'
            >
                <SANScroll
                    containerRef={ref => (scrollRef.current = ref)}
                    onYReachEnd={() => setHasButton(false)}
                    onScrollUp={() => !hasButton && setHasButton(true)}
                >
                    <SANInfiniteScroll
                        isReverse
                        threshold={54}
                        {...InfiniteProps}
                    >
                        {content}
                    </SANInfiniteScroll>
                </SANScroll>
                {hasButton && (
                    <SANBox
                        position='absolute'
                        bottom='xs'
                        left='calc(50% - 16px)'
                    >
                        <SANButton
                            circle
                            variant='solid'
                            color='primary'
                            size='small'
                            onClick={goScrollBottom}
                        >
                            <SANEvaIcon name='arrow-downward-outline' />
                        </SANButton>
                    </SANBox>
                )}
            </SANBox>
            {blocked ? (
                <SANBox
                    display='flex'
                    alignItems='center'
                    justifyContent='center'
                    border='1px solid'
                    borderColor='grey.2'
                    borderBottomRightRadius='base'
                    borderBottomLeftRadius='base'
                    bg='grey-solid.1'
                    py='md'
                >
                    <SANTypography fontSize='md' color='grey.6'>
                        {t('chat.blocked')}
                    </SANTypography>
                </SANBox>
            ) : (
                <SANBox
                    display='flex'
                    alignItems='center'
                    justifyContent='space-between'
                    border='1px solid'
                    borderColor='grey.2'
                    borderRadius='base'
                    px='md'
                    pt='sm'
                    pb='lg'
                    bg='white.10'
                    position='relative'
                >
                    <SANAvatar src={image} size={28} borderRadius={14} />
                    <SANBox mx='xs' width='calc(100% - 68px)'>
                        <SANInputStyled
                            placeholder={t('chat.writeSomething')}
                            contentEditable
                            ref={inputRef}
                            onKeyPress={handleKeyPress}
                            onScroll={handleScroll}
                            style={{ height: inputHeight }}
                        />
                    </SANBox>
                    <SANButton
                        circle
                        variant='text'
                        size='xsmall'
                        onClick={handleSend}
                        disabled={
                            loading || submitting || letterCount >= maxLetters
                        }
                    >
                        <SANEvaIcon name='paper-plane-outline' />
                    </SANButton>
                    <SANBox position='absolute' bottom='0' right='48px'>
                        <SANTypography
                            fontWeight='bold'
                            fontSize='xs'
                            color={colorCount}
                        >
                            {letterCount}/{maxLetters}
                        </SANTypography>
                    </SANBox>
                </SANBox>
            )}
        </SANBox>
    )
}

export default SANChat
