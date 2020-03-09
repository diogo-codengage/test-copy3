import React from 'react'

import { format } from 'date-fns'

import { SANBox, ISANBoxProps } from '../../Atoms/Box'
import { SANTypography } from '../../Atoms/Typography'
import { SANSkeleton } from 'Components/Atoms/Skeleton'
import { SANDivider } from '../../Atoms/Divider'

import Linkify from 'react-linkify'

export interface ISANChatItemProps extends ISANBoxProps {
    name: string
    time: string
    message: string
    hasDivider?: boolean
}

export const skeletons = new Array(2).fill(0).map((_, i) => i)
export const renderSkeleton = index => <SANChatItemSkeleton key={index} />

const componentDecorator = (href, text, key) => (
    <a href={href} key={key} target='_blank' color='primary' rel='noopener'>
        {text}
    </a>
)

export const SANChatItem: React.FC<ISANChatItemProps> = ({
    name,
    time,
    message,
    hasDivider,
    ...props
}) => (
    <SANBox
        display='flex'
        flexDirection='column'
        alignItems='start'
        px='md'
        mb='xs'
        {...props}
    >
        <SANTypography fontWeight='bold' fontSize='sm' color='grey.6'>
            {name}
        </SANTypography>
        <SANTypography fontSize='xs' color='grey.6'>
            {format(new Date(time), 'HH:mm')}
        </SANTypography>
        <Linkify componentDecorator={componentDecorator}>
            <SANTypography
                fontSize='md'
                color='grey.8'
                style={{ wordBreak: 'break-word' }}
            >
                {message}
            </SANTypography>
        </Linkify>
        {hasDivider && <SANDivider bg='grey.1' width='100%' mb='0' />}
    </SANBox>
)

export const SANChatItemSkeleton: React.FC<ISANBoxProps> = props => (
    <SANBox display='flex' alignItems='start' px='md' mb='md' {...props}>
        <SANSkeleton
            avatar={{ size: 32, shape: 'circle' }}
            paragraph={{ rows: 2 }}
            title={{ width: '40%' }}
        />
    </SANBox>
)
