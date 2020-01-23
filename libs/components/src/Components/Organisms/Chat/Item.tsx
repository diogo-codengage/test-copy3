import React from 'react'

import { format } from 'date-fns'

import { getUTCDate } from '@sanar/utils/dist/Date'

import { SANBox, ISANBoxProps } from '../../Atoms/Box'
import { SANAvatar } from '../../Atoms/Avatar'
import { SANTypography } from '../../Atoms/Typography'
import { SANSkeleton } from 'Components/Atoms/Skeleton'

export interface ISANChatItemProps extends ISANBoxProps {
    image?: string
    name: string
    time: string
    message: string
}

export const skeletons = new Array(2).fill(0).map((_, i) => i)
export const renderSkeleton = index => <SANChatItemSkeleton key={index} />

export const SANChatItem: React.FC<ISANChatItemProps> = ({
    image,
    name,
    time,
    message,
    ...props
}) => (
    <SANBox display='flex' alignItems='end' px='md' mb='md' {...props}>
        <SANAvatar src={image} size={32} borderRadius={16} />
        <SANBox ml='md' width='calc(100% - 48px)'>
            <SANTypography fontWeight='bold' fontSize='sm' color='grey.6'>
                {name}
            </SANTypography>
            <SANTypography fontSize='xs' color='grey.6'>
                {format(new Date(time), 'HH:mm')}
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
            title={{ width: '40%' }}
        />
    </SANBox>
)
