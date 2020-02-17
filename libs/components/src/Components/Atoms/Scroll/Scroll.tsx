import React from 'react'
import PropTypes from 'prop-types'

import PerfectScrollbar from '@opuscapita/react-perfect-scrollbar'

export type ISANScrollProps = PropTypes.InferProps<
    typeof PerfectScrollbar['propTypes']
> & {
    option?: Object
    containerRef?: (e: any) => void
    onScrollY?: (e: any) => void
    onScrollX?: (e: any) => void
    onScrollUp?: (e: any) => void
    onScrollDown?: (e: any) => void
    onScrollLeft?: (e: any) => void
    onScrollRight?: (e: any) => void
    onYReachStart?: (e: any) => void
    onYReachEnd?: (e: any) => void
    onXReachStart?: (e: any) => void
    onXReachEnd?: (e: any) => void
    children: React.ReactNode
}

const SANScroll: React.FC<ISANScrollProps> = props => (
    <PerfectScrollbar {...props} />
)

export default SANScroll
