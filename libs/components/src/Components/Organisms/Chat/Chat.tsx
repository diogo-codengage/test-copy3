import React, { useCallback, useRef, useEffect, useState } from 'react'

import { useTranslation } from 'react-i18next'
import styled from 'styled-components'

import { useWindowSize } from '@sanar/utils/dist/Hooks'

import { SANTextArea } from '../../Atoms/TextArea'
import { SANButton } from '../../Atoms/Button'
import { SANBox, ISANBoxProps } from '../../Atoms/Box'
import { SANAvatar } from '../../Atoms/Avatar'
import { SANEvaIcon } from '../../Atoms/EvaIcon'
import { SANScroll } from '../../Atoms/Scroll'
import { SANTypography } from '../../Atoms/Typography'
import {
    SANInfiniteScroll,
    ISANInfiniteScrollProps
} from '../../Atoms/InfiniteScroll'
import { SANSkeleton } from 'Components/Atoms/Skeleton'

const SANTextAreaStyled = styled(SANTextArea)`
    border: none;
    box-shadow: none;
    padding: 0;
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

export interface ISANChatItemProps extends ISANBoxProps {
    image?: string
    name: string
    time: string
    message: string
}

export const SANChatItem: React.FC<ISANChatItemProps> = ({
    image,
    name,
    time,
    message,
    ...props
}) => (
    <SANBox display='flex' alignItems='end' px='md' mb='md' {...props}>
        <SANAvatar src={image} size={32} borderRadius={16} />
        <SANBox ml='md'>
            <SANTypography fontWeight='bold' fontSize='sm' color='grey.6'>
                {name}
            </SANTypography>
            <SANTypography fontSize='xs' color='grey.6'>
                {time}
            </SANTypography>
            <SANTypography fontSize='md' color='grey.8'>
                {message}
            </SANTypography>
        </SANBox>
    </SANBox>
)

export const SANChatItemSkeleton: React.FC<ISANBoxProps> = props => (
    <SANBox display='flex' alignItems='end' px='md' mb='md' {...props}>
        <SANSkeleton
            avatar={{ size: 32, shape: 'circle' }}
            paragraph={{ rows: 2 }}
            title={{ width: '20%' }}
        />
    </SANBox>
)

const skeletons = new Array(3).fill(0).map((_, i) => i)
const renderSkeleton = index => <SANChatItemSkeleton key={index} />

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
    const [rows, setRows] = useState(width < 768 ? 2 : 1)
    const scrollRef = useRef<any>()
    const inputRef = useRef<any>()

    const handleSend = () => {
        setSubmitting(true)
        !!onSend && onSend(inputRef.current.value, { setSubmitting })
        if (!!inputRef && !!inputRef.current) {
            inputRef.current.value = ''
            inputRef.current.focus()
        }
    }

    const handleKeyPress = e => {
        if (e.charCode === 13) {
            handleSend()
        }
    }

    const goScrollBottom = () => {
        if (!!scrollRef && !!scrollRef.current) {
            scrollRef.current.scrollTo(0, scrollRef.current.scrollHeight)
        }
    }

    const handleScrollInput = e => {
        if (!!inputRef && !!inputRef.current) {
        }
    }

    const handleChange = () => {
        if (!!inputRef && !!inputRef.current) {
            console.log(inputRef.current.scrollHeight)
            // if (inputRef.current.scrollHeight === 42) {
            //     setRows(old => old + 1)
            // } else {
            //     setRows(old => old - 1)
            // }
        }
    }

    const renderMessage = useCallback(
        (message, index) => (
            <SANChatItem
                {...message}
                key={index}
                mt={index === 0 ? 'md' : '0px'}
            />
        ),
        []
    )

    useEffect(() => {
        goScrollBottom()
    }, [messages])

    return (
        <SANBox display='flex' flexDirection='column'>
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
                    <SANInfiniteScroll {...InfiniteProps}>
                        {loading
                            ? skeletons.map(renderSkeleton)
                            : messages.map(renderMessage)}
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
                    py='sm'
                    bg='white.10'
                >
                    <SANAvatar src={image} size={28} borderRadius={14} />
                    <SANBox flex='1' mx='sm'>
                        <SANTextAreaStyled
                            placeholder='Escrever algo'
                            rows={rows}
                            ref={inputRef}
                            onKeyPress={handleKeyPress}
                            onScroll={handleScrollInput}
                            onChange={handleChange}
                        />
                    </SANBox>
                    <SANButton
                        circle
                        variant='text'
                        size='xsmall'
                        onClick={handleSend}
                        disabled={loading || submitting}
                    >
                        <SANEvaIcon name='paper-plane-outline' />
                    </SANButton>
                </SANBox>
            )}
        </SANBox>
    )
}

export default SANChat
