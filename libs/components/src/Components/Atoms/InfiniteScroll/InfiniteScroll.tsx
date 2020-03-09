import React, { useMemo } from 'react'

import InfiniteScroll from 'react-infinite-scroller'

import styled from 'styled-components'
import { theme } from 'styled-tools'
import { SANSpin } from '../Spin'

export interface ISANInfiniteScrollProps {
    element?: string
    hasMore?: boolean
    initialLoad?: boolean
    isReverse?: boolean
    loadMore(page: number): void
    pageStart?: number
    threshold?: number
    useCapture?: boolean
    useWindow?: boolean
    loader?: React.ReactElement
    getScrollParent?(): any
}

export const SANInfiniteScrollLoader = styled(SANSpin)`
    && {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: ${theme('space.sm')};
        padding-top: ${theme('space.xxl')};
    }
`

const SANInfiniteScroll: React.FC<ISANInfiniteScrollProps> = props => {
    const customProps = useMemo(
        () => ({
            loader: !props.loader ? (
                <SANInfiniteScrollLoader key={new Date().getTime()} />
            ) : (
                props.loader
            ),
            ...props
        }),
        [props]
    )

    return <InfiniteScroll {...customProps} />
}

export default SANInfiniteScroll
