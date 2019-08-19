import React, { useMemo } from 'react'

import InfiniteScroll from 'react-infinite-scroller'

import styled from 'styled-components'
import { theme } from 'styled-tools'
import { SANSpin } from '../Spin'

interface IProps {
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

const SANSpinStyled = styled(SANSpin)`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: ${theme('space.sm')};
`

const SANButton: React.FC<IProps> = props => {
    const customProps = useMemo(
        () => ({
            loader: !props.loader ? <SANSpinStyled /> : props.loader,
            ...props
        }),
        [props]
    )

    return <InfiniteScroll {...customProps} />
}

export default SANButton
