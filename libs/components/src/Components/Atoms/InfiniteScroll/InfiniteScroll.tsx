import React from 'react'

import InfiniteScroll from 'react-infinite-scroller'

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

const SANButton: React.FC<IProps> = props => {
    return <InfiniteScroll {...props} loader={<div key={0}>Loading ...</div>} />
}

export default SANButton
